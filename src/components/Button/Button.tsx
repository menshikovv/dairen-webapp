import s from './Button.module.scss'
import { useNavigate } from 'react-router-dom'

export const Button = ({ 
    children, 
    style,
    href
}: { 
    children: React.ReactNode, 
    style?: string | React.CSSProperties,
    href?: string
}) => {
    const navigate = useNavigate();
    const className = typeof style === 'string' ? `${s.button} ${style}` : s.button;
    const inlineStyle = typeof style === 'object' ? style : undefined;

    const handleClick = () => {
        if (href) {
            // Проверяем, является ли ссылка внешней (начинается с http:// или https://)
            if (href.startsWith('http://') || href.startsWith('https://')) {
                window.open(href, '_blank', 'noopener,noreferrer');
            } else {
                // Внутренняя навигация
                navigate(href);
            }
        }
    };

    return (
        <button 
            className={className}
            style={inlineStyle}
            onClick={handleClick}
        >
            {children}
        </button>
    )
}