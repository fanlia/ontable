
import request from 'superagent'
import cheerio from 'cheerio'
import nodemailer from 'nodemailer'

import { get as getEmail } from '../models/Email'

export default async function worker(job) {

    const {
        url,
        keywords = [],
        actions = [],
    } = job.data || {}

    if (!url || keywords.length === 0 || actions.length === 0) return

    // console.log({
    //     url,
    //     keywords,
    //     actions,
    // })
    // fetch

    const res = await request.get(url).disableTLSCerts()
    const html = res.text

    // parse

    const $ = cheerio.load(html)
    const links = $('#list a[href]')
    .toArray()
    .map(el => {
        const $el = $(el)
        const href = $el.attr('href')
        const text = $el.text().trim()

        return {
            href,
            text,
        }
    })

    // test

    const targets = links.filter(link => keywords.every(dd => link.text.includes(dd)))
    if (targets.length === 0) {
        return
    }

    // send

    let results = []

    for (const { type, data = {} } of actions) {
        if (type === 'email') {
            const email = await getEmail()
            if (!email || !data.to) continue

            const transporter = nodemailer.createTransport(email)

            const info = await transporter.sendMail({
                from: email.auth.user,
                to: data.to,
                subject: keywords.join(' '),
                html: targets.map(link => `<a href="${link.href}">${link.text}</a>`).join('<br/>'),
            })

            results.push({ type, info })
        }
    }

    return results
}
