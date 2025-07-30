import s from './Main.module.scss'
import { Link } from 'react-router-dom'

export const Main = () => {
    return (
        <div className={s.mainContent}>
            <Link to="/dkm" className={s.navLink}>
                <h2>ЧТО ЭТО?</h2>
            </Link>
            <Link to="https://t.me/winsdairencommunity" className={s.navLink}>
                <h2>ОТЗЫВЫ</h2>
            </Link>
            <Link to="/guides" className={s.navLink}>
                <h2>СПИСОК ГАЙДОВ</h2>
            </Link>
            <Link to="https://t.me/dairencommunity_bot?start=0" className={s.navLink}>
                <h2>ПОЛУЧИТЬ ДОСТУП</h2>
            </Link>
        </div>
    )
}