
import { useRouter } from 'next/router'
import { Menu } from 'antd'

export default function Navbar() {
    const router = useRouter()

    const handleClick = (e) => {
        router.push(e.key)
    }
    const items = [
        {
            label: 'Home',
            key: '/',
        },
        {
            label: 'Task',
            key: '/task',
        },
        {
            label: 'Email',
            key: '/email',
        },
    ]
    return (
        <Menu
            items={items}
            mode='horizontal'
            defaultSelectedKeys={[router.route]}
            onClick={handleClick}
            theme='dark'
        />
    )
}
