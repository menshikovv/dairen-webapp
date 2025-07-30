import s from './Guides.module.scss'
import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { tg } from '../../shared/lib/telegram'

export const Guides = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
    const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set())
    const [showScrollIndicator, setShowScrollIndicator] = useState(true)
    const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
    const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

    useEffect(() => {
        tg.BackButton.show()
        tg.BackButton.onClick(() => {
            navigate(-1)
            tg.BackButton.hide()
        })
        return () => {
            tg.BackButton.hide()
        }
    }, [])

    // Прокрутка наверх при загрузке страницы
    useEffect(() => {
        const mainElement = document.querySelector('main')
        if (mainElement) {
            mainElement.scrollTo(0, 0)
        }
        window.scrollTo(0, 0)
        setShowScrollIndicator(true)
    }, [location.pathname])

    // Обработчик прокрутки для скрытия индикатора
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowScrollIndicator(false)
            } else {
                setShowScrollIndicator(true)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Intersection Observer для анимации секций при скролле
    useEffect(() => {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.getAttribute('data-section-id')
                        if (sectionId) {
                            setVisibleSections(prev => new Set([...prev, sectionId]))
                        }
                    }
                })
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        )

        // Наблюдаем за всеми секциями
        Object.values(sectionRefs.current).forEach((ref) => {
            if (ref) {
                sectionObserver.observe(ref)
            }
        })

        return () => {
            sectionObserver.disconnect()
        }
    }, [])

    // Intersection Observer для анимации элементов списка при скролле
    useEffect(() => {
        const itemObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const itemId = entry.target.getAttribute('data-item-id')
                        if (itemId) {
                            setVisibleItems(prev => new Set([...prev, itemId]))
                        }
                    }
                })
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -20px 0px'
            }
        )

        // Наблюдаем за всеми элементами списка
        Object.values(itemRefs.current).forEach((ref) => {
            if (ref) {
                itemObserver.observe(ref)
            }
        })

        return () => {
            itemObserver.disconnect()
        }
    }, [])

    const setSectionRef = (sectionId: string) => (el: HTMLDivElement | null) => {
        sectionRefs.current[sectionId] = el
    }

    const setItemRef = (itemId: string) => (el: HTMLDivElement | null) => {
        itemRefs.current[itemId] = el
    }

    return (
        <div className={s.guidesContainer}>
            <div className={`${s.header} ${s.fadeIn}`}>
                <h1>ГАЙДЫ ПЕРВОЙ НЕОБХОДИМОСТИ!</h1>
            </div>
            
            {/* Индикатор прокрутки */}
            <div className={`${s.scrollIndicator} ${s.fadeIn} ${showScrollIndicator ? s.visible : s.hidden}`}>
                <div className={s.scrollArrow}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <span className={s.scrollText}>Листай вниз</span>
            </div>

            <div 
                ref={setSectionRef('business')}
                data-section-id="business"
                className={`${s.section} ${visibleSections.has('business') ? s.visible : ''}`}
            >
                <h2>ТЕМЫ БИЗНЕСА И ЗАРАБОТКА</h2>
                <p className={s.sectionDescription}>
                    Сборник Гайдов по теме бизнеса, заработка, денег и всё в таком роде.
                    Всё записано исходя из моего жизненного опыта + многое взято от людей, 
                    которые без преувеличения имеют пол-миллиона $ капитал.
                </p>
                
                <div className={s.guideList}>
                    <div 
                        ref={setItemRef('business-1')}
                        data-item-id="business-1"
                        className={`${s.guideItem} ${visibleItems.has('business-1') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>ВСЁ ПРО ИНФОПРОДУКТ: Создание, Маркетинг, Прогрев и Продажи (первые деньги ч.1)</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('business-2')}
                        data-item-id="business-2"
                        className={`${s.guideItem} ${visibleItems.has('business-2') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>УСЛУГИ и СЕРВИС - ЛУЧШИЙ Способ Заработать Первые Деньги. От А-Я (первые деньги ч.2)</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('business-3')}
                        data-item-id="business-3"
                        className={`${s.guideItem} ${visibleItems.has('business-3') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>ПОЛНЫЙ РАЗБОР ПРОГРЕВА НА 10.000$ + как тебе сделать первый запуск</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('business-4')}
                        data-item-id="business-4"
                        className={`${s.guideItem} ${visibleItems.has('business-4') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>ГАЙД ПО ПРОДАЖАМ - КАК ПРОДАВАТЬ СВОИ УСЛУГИ И ИНФОПРОДУКТЫ</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('business-5')}
                        data-item-id="business-5"
                        className={`${s.guideItem} ${visibleItems.has('business-5') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>КАК ПИСАТЬ КЛИЕНТАМ в 2025, ЧТОБЫ НЕ БЫТЬ ПОСЛАННЫМ НАХУЙ</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('business-6')}
                        data-item-id="business-6"
                        className={`${s.guideItem} ${visibleItems.has('business-6') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>ПОЛНЫЙ ГАЙД НА СОЗДАНИЕ КОНТЕНТА И ВХОД В МЕДИА как Эксперта (обновлённый, улучшеный)</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('business-7')}
                        data-item-id="business-7"
                        className={`${s.guideItem} ${visibleItems.has('business-7') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>КАК ПРОДАВАТЬ ЧЕРЕЗ СОЦ СЕТИ. Ютуб, Инста/ТикТок, Телеграм</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('business-8')}
                        data-item-id="business-8"
                        className={`${s.guideItem} ${visibleItems.has('business-8') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>ПОРТРЕТ ЦЕЛЕВОЙ АУДИТОРИИ + КАК ПОСТРОИТЬ КОНТЕНТ ПЛАН ПОД НЕЁ</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('business-9')}
                        data-item-id="business-9"
                        className={`${s.guideItem} ${visibleItems.has('business-9') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>КАК ВЕСТИ/ОФОРМЛЯТЬ СВОЙ ТГК ЧТОБЫ ОН ПРОДАВАЛ?</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('business-10')}
                        data-item-id="business-10"
                        className={`${s.guideItem} ${visibleItems.has('business-10') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Про окружение. Как влиться в заряженное окружение</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('business-11')}
                        data-item-id="business-11"
                        className={`${s.guideItem} ${visibleItems.has('business-11') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Саморазвитие ради саморазвитие = бесполезное дрочево. Привычки, окружение, заработок.</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('business-12')}
                        data-item-id="business-12"
                        className={`${s.guideItem} ${visibleItems.has('business-12') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Гайд на личный бренд и медийку</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('business-13')}
                        data-item-id="business-13"
                        className={`${s.guideItem} ${visibleItems.has('business-13') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Гайд на деньги. Подробный пошаговый гайд по выходу на 100 000руб / месяц с нуля. Декомпозиция</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('business-14')}
                        data-item-id="business-14"
                        className={`${s.guideItem} ${visibleItems.has('business-14') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Фокус внимания, или 'почему ты до сих пор в жопе'</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('business-15')}
                        data-item-id="business-15"
                        className={`${s.guideItem} ${visibleItems.has('business-15') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Психология богатства и бедности, которую ты обязан понимать на старте</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('business-16')}
                        data-item-id="business-16"
                        className={`${s.guideItem} ${visibleItems.has('business-16') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Если тебе кажется, что ты делаешь всё не так и ничего не получится. (Послушай голосовые под скринами)</span>
                    </div>
                </div>
            </div>

            <div 
                ref={setSectionRef('mindset')}
                data-section-id="mindset"
                className={`${s.section} ${visibleSections.has('mindset') ? s.visible : ''}`}
            >
                <h2>ЛИЧНОСТНЫЙ РОСТ. МАЙНДСЕТ</h2>
                <p className={s.sectionDescription}>
                    Сборник Гайдов для личностного роста. Всё записано исходя из моего жизненного опыта. 
                    Поглощай, применяй, наблюдай за изменениями:
                </p>
                
                <div className={s.guideList}>
                    <div 
                        ref={setItemRef('mindset-1')}
                        data-item-id="mindset-1"
                        className={`${s.guideItem} ${visibleItems.has('mindset-1') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Полный гайд "как наладить свою жизнь" (главные сферы жизни)</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('mindset-2')}
                        data-item-id="mindset-2"
                        className={`${s.guideItem} ${visibleItems.has('mindset-2') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Школа мешает, работа мешает, времени нету, я заебался, всё давит. Выход тут:</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('mindset-3')}
                        data-item-id="mindset-3"
                        className={`${s.guideItem} ${visibleItems.has('mindset-3') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Про соц сети. Поглощение контента. Вижн. Создание ахуенной версии себя. Романтизация жизни</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('mindset-4')}
                        data-item-id="mindset-4"
                        className={`${s.guideItem} ${visibleItems.has('mindset-4') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Саморазвитие ради саморазвитие = бесполезное дрочево. Привычки, окружение, заработок.</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('mindset-5')}
                        data-item-id="mindset-5"
                        className={`${s.guideItem} ${visibleItems.has('mindset-5') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>ПОСЛУШАЙ, ЕСЛИ ТВОЯ ЖИЗНЬ СОСТОИТ ИЗ БЕЛЫХ И ЧЕРНЫХ ПОЛОС</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('mindset-6')}
                        data-item-id="mindset-6"
                        className={`${s.guideItem} ${visibleItems.has('mindset-6') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Как перестать бояться сделать первый шаг</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('mindset-7')}
                        data-item-id="mindset-7"
                        className={`${s.guideItem} ${visibleItems.has('mindset-7') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Как побороть страх осуждения людей по отношению к твоему блогу</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('mindset-8')}
                        data-item-id="mindset-8"
                        className={`${s.guideItem} ${visibleItems.has('mindset-8') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Как навсегда убрать выгорание, тильт, апатию</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('mindset-9')}
                        data-item-id="mindset-9"
                        className={`${s.guideItem} ${visibleItems.has('mindset-9') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>100% Способ найти любимое дело. На своём примере. это безотказно работает.</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('mindset-10')}
                        data-item-id="mindset-10"
                        className={`${s.guideItem} ${visibleItems.has('mindset-10') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Фокус внимания, или 'почему ты до сих пор в жопе'</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('mindset-11')}
                        data-item-id="mindset-11"
                        className={`${s.guideItem} ${visibleItems.has('mindset-11') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Как быстро и эффективно учить английский</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('mindset-12')}
                        data-item-id="mindset-12"
                        className={`${s.guideItem} ${visibleItems.has('mindset-12') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Огромный подкаст про образование, универ, 9/11 класс, моя история, мой опыт, куча инсайтов</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('mindset-13')}
                        data-item-id="mindset-13"
                        className={`${s.guideItem} ${visibleItems.has('mindset-13') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Если кажется, что выхода нет.</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('mindset-14')}
                        data-item-id="mindset-14"
                        className={`${s.guideItem} ${visibleItems.has('mindset-14') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Просто доверься процессу, и любая твоя мечта осуществится</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('mindset-15')}
                        data-item-id="mindset-15"
                        className={`${s.guideItem} ${visibleItems.has('mindset-15') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Только долгосрок. Не ориентируйся на путь других ребят</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('mindset-16')}
                        data-item-id="mindset-16"
                        className={`${s.guideItem} ${visibleItems.has('mindset-16') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Обязательно найди себе цель - маяк</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('mindset-17')}
                        data-item-id="mindset-17"
                        className={`${s.guideItem} ${visibleItems.has('mindset-17') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Как вывести цель на селудующие 2-4 месяца и построить план по её достижению?</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('mindset-18')}
                        data-item-id="mindset-18"
                        className={`${s.guideItem} ${visibleItems.has('mindset-18') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Всегда лови баланс в жизни броу!</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('mindset-19')}
                        data-item-id="mindset-19"
                        className={`${s.guideItem} ${visibleItems.has('mindset-19') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>вылези из своих мыслей и сделай действие.</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('mindset-20')}
                        data-item-id="mindset-20"
                        className={`${s.guideItem} ${visibleItems.has('mindset-20') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Полный гайд на создание контента и вход в медиа</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('mindset-21')}
                        data-item-id="mindset-21"
                        className={`${s.guideItem} ${visibleItems.has('mindset-21') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Дай себе отдохнуть бро.</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('mindset-22')}
                        data-item-id="mindset-22"
                        className={`${s.guideItem} ${visibleItems.has('mindset-22') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>ВСЁ СУПЕР ПРОСТО. ВАРИАНТА ПОРАЖЕНИЕ НЕТ!</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('mindset-23')}
                        data-item-id="mindset-23"
                        className={`${s.guideItem} ${visibleItems.has('mindset-23') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Если тебе кажется, что ты делаешь всё не так и ничего не получится. (Послушай голосовые под скринами)</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('mindset-24')}
                        data-item-id="mindset-24"
                        className={`${s.guideItem} ${visibleItems.has('mindset-24') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Посмотри, если путь к твоей цели лежит через постоянные действия</span>
                    </div>
                </div>
            </div>

            <div 
                ref={setSectionRef('youtube')}
                data-section-id="youtube"
                className={`${s.section} ${visibleSections.has('youtube') ? s.visible : ''}`}
            >
                <h2>
                    <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginRight: '8px' }}
                    >
                        <path 
                            d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" 
                            fill="#FF0000"
                        />
                    </svg>
                    ЮТУБ
                </h2>
                <p className={s.sectionDescription}>
                    Сборник Гайдов для личностного роста. Держи в курсе, что это контент. 
                    Мета меняется, актуальность некоторых вещей может угасать. Да, этого сборника более чем хватает, 
                    чтобы с 0 опытом зайти на ютуб и сделать видео спокойно хоть на 100к просмотров, 
                    но всё же, держи в курсе, что это не бизнес схемка 'как стать миллиардером за 1 день' 
                    это игра в долгосрок.
                </p>
                
                <div className={s.guideList}>
                    <div 
                        ref={setItemRef('youtube-1')}
                        data-item-id="youtube-1"
                        className={`${s.guideItem} ${visibleItems.has('youtube-1') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>ПОЛНЫЙ ГАЙД НА СОЗДАНИЕ КОНТЕНТА И ВХОД В МЕДИА</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('youtube-2')}
                        data-item-id="youtube-2"
                        className={`${s.guideItem} ${visibleItems.has('youtube-2') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Выбор ниши (статья)</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('youtube-3')}
                        data-item-id="youtube-3"
                        className={`${s.guideItem} ${visibleItems.has('youtube-3') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Гайд на алгоритмы ютуба (статья)</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('youtube-4')}
                        data-item-id="youtube-4"
                        className={`${s.guideItem} ${visibleItems.has('youtube-4') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Гайд на взрывную идею на ютубе</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('youtube-5')}
                        data-item-id="youtube-5"
                        className={`${s.guideItem} ${visibleItems.has('youtube-5') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Гайд на превью и название (статья)</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('youtube-6')}
                        data-item-id="youtube-6"
                        className={`${s.guideItem} ${visibleItems.has('youtube-6') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Гайд на удержание</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('youtube-7')}
                        data-item-id="youtube-7"
                        className={`${s.guideItem} ${visibleItems.has('youtube-7') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Урок #1 - Создание и настройка канала</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('youtube-8')}
                        data-item-id="youtube-8"
                        className={`${s.guideItem} ${visibleItems.has('youtube-8') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Урок #2 - Выбор тематики. Какую нишу выбрать</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('youtube-9')}
                        data-item-id="youtube-9"
                        className={`${s.guideItem} ${visibleItems.has('youtube-9') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Урок #3 - Этап создания роликов</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('youtube-10')}
                        data-item-id="youtube-10"
                        className={`${s.guideItem} ${visibleItems.has('youtube-10') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Урок #4 - АБСОЛЮТНО ПОЛНЫЙ РАЗБОР Алгоритмов Ютуб (очень полезно)</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('youtube-11')}
                        data-item-id="youtube-11"
                        className={`${s.guideItem} ${visibleItems.has('youtube-11') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Урок #5 - Гайд на SEO оптимизацию</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('youtube-12')}
                        data-item-id="youtube-12"
                        className={`${s.guideItem} ${visibleItems.has('youtube-12') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Идея ролика — это изначально самый важный пункт</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('youtube-13')}
                        data-item-id="youtube-13"
                        className={`${s.guideItem} ${visibleItems.has('youtube-13') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Полный подробный гайд на превью и название (очень важно)</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('youtube-14')}
                        data-item-id="youtube-14"
                        className={`${s.guideItem} ${visibleItems.has('youtube-14') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>Как анализировать любую нишу + наглядный пример</span>
                    </div>
                </div>
            </div>

            <div 
                ref={setSectionRef('niches')}
                data-section-id="niches"
                className={`${s.section} ${visibleSections.has('niches') ? s.visible : ''}`}
            >
                <h2>СЕРИЯ ГАЙДОВ ПРО НИШИ</h2>
                <div className={s.guideList}>
                    <div 
                        ref={setItemRef('niches-1')}
                        data-item-id="niches-1"
                        className={`${s.guideItem} ${visibleItems.has('niches-1') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>ПОЛНЫЙ ГАЙД НА НИШИ - ч.1</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('niches-2')}
                        data-item-id="niches-2"
                        className={`${s.guideItem} ${visibleItems.has('niches-2') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>ПОЛНЫЙ ГАЙД НА НИШИ - ч.2</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('niches-3')}
                        data-item-id="niches-3"
                        className={`${s.guideItem} ${visibleItems.has('niches-3') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>ПОЛНЫЙ ГАЙД НА НИШИ - ч.3</span>
                    </div>
                </div>
            </div>

            <div 
                ref={setSectionRef('calls')}
                data-section-id="calls"
                className={`${s.section} ${visibleSections.has('calls') ? s.visible : ''}`}
            >
                <h2>Записи Созвонов</h2>
                <p className={s.sectionDescription}>
                    Всё просто. Архив записей созвонов и прямых эфиров.
                </p>
                
                <div className={s.guideList}>
                    <div 
                        ref={setItemRef('calls-1')}
                        data-item-id="calls-1"
                        className={`${s.guideItem} ${visibleItems.has('calls-1') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>22.10 Куча инсайтов. Задание, которое ты обязан сделать, если реально хочешь двигаться вперёд.</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('calls-2')}
                        data-item-id="calls-2"
                        className={`${s.guideItem} ${visibleItems.has('calls-2') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>03.11 Перестройся с майндсета с results based на process based</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('calls-3')}
                        data-item-id="calls-3"
                        className={`${s.guideItem} ${visibleItems.has('calls-3') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>22.11 Общение, как стать популярным в медиа, мысли, ответы на вопросы</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('calls-4')}
                        data-item-id="calls-4"
                        className={`${s.guideItem} ${visibleItems.has('calls-4') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>30.11 Не стань броуком, пытаясь выглядеть богато</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('calls-5')}
                        data-item-id="calls-5"
                        className={`${s.guideItem} ${visibleItems.has('calls-5') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>17.12 Ламопый разговорный. Куча ахуенных тейков</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('calls-6')}
                        data-item-id="calls-6"
                        className={`${s.guideItem} ${visibleItems.has('calls-6') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>ЭФИР 11.02</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('calls-7')}
                        data-item-id="calls-7"
                        className={`${s.guideItem} ${visibleItems.has('calls-7') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>ЭФИР 30.04</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('calls-8')}
                        data-item-id="calls-8"
                        className={`${s.guideItem} ${visibleItems.has('calls-8') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>ЭФИР 01.06 - Разборы</span>
                    </div>
                    
                    <div 
                        ref={setItemRef('calls-9')}
                        data-item-id="calls-9"
                        className={`${s.guideItem} ${visibleItems.has('calls-9') ? s.visible : ''}`}
                    >
                        <span className={s.guideTitle}>ЭФИР 19.06</span>
                    </div>
                </div>
            </div>
        </div>
    )
} 