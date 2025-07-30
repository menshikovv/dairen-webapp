import s from './Dkm.module.scss'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../Button/Button'
import { tg } from '../../shared/lib/telegram'

export const Dkm = () => {
    const navigate = useNavigate()
    const [showContent, setShowContent] = useState(false)
    const [hideTitle, setHideTitle] = useState(false)
    const [titleFadeOut, setTitleFadeOut] = useState(false)

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

    useEffect(() => {
        const timer = setTimeout(() => {
            setTitleFadeOut(true)
            
            const contentTimer = setTimeout(() => {
                setShowContent(true)
                setHideTitle(true)
            }, 500)

            return () => clearTimeout(contentTimer)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        const event = new CustomEvent('overflowChange', {
            detail: { hidden: !hideTitle }
        })
        window.dispatchEvent(event)

        return () => {
            const cleanupEvent = new CustomEvent('overflowChange', {
                detail: { hidden: false }
            })
            window.dispatchEvent(cleanupEvent)
        }
    }, [hideTitle])

    return (
        <div className={s.simonContent}>
            {!hideTitle && (
                <h2 className={titleFadeOut ? s.fadeOut : ''}>DAIREN. COMMUNITY <br /> ДКМ</h2>
            )}
            {showContent && (
                <>
                <div className={`${s.content} ${s.fadeIn}`}>
                    <div className={s.mainInfo}>
                        <div className={s.header}>
                            <h3>ЧТО ЭТО?</h3>
                            <p className={s.subtitle}>Самый быстрый и эффективный способ выхода на 1000-3000$ / мес.</p>
                        </div>
                        
                        <div className={s.benefits}>
                            <ul>
                                <li>Научишься получать трафик бесплатно, используя личный бренд + соц. сети</li>
                                <li>Узнаешь всё об продажах в блоге</li>
                                <li>Начнёшь зарабатывать используя свой/наработанный скилл</li>
                                <li>Поймёшь как вылезти из "нестабильных 50к месяц" на 100,200,300к</li>
                                <li>Чётко поймёшь что делать и как выйти на 100-300к в месяц</li>
                            </ul>
                        </div>

                        <div className={s.additionalBenefits}>
                            <ul>
                                <li>Снесёшь старые убеждения которые тянут назад</li>
                                <li>Найдёшь своё дело, если такового нет</li>
                                <li>Выработаешь востребованный скилл в кратчайшие сроки</li>
                            </ul>
                        </div>
                    </div>

                    <div className={s.section}>
                        <h3>В каких случаях мне это решение подойдёт?</h3>
                        <p className={s.sectionIntro}>Это подойдёт тебе, даже если:</p>
                        <ul>
                            <li>Ты зарабатываешь в районе от 0 до 100к</li>
                            <li>Учёба / работа занимает большую часть времени</li>
                            <li>Нет опыта ни в одном деле</li>
                            <li>Не веришь, что зарабатывать большие деньги тебе вообще посильно</li>
                        </ul>
                    </div>
                    <Button href="/guides" style={{  marginBottom: '2.5rem' }}>
                        <p>СПИСОК ГАЙДОВ</p>
                    </Button>
                    <div className={s.section}>
                        <h3>ПОЧЕМУ Я МОГУ ПОМОЧЬ?</h3>
                        <div className={s.personalStory}>
                            <p>Я описал версию себя из 2023 года. Я как никто лучше знаю, какие у тебя проблемы и как их эффективнее всего решить.</p>
                            <p className={s.highlight}>Я КАК НИКТО ДРУГОЙ ЗНАЮ, Как тебе вылезти из твоего дна, ВЕДЬ Я САМ ЭТО ПРОШЁЛ.</p>
                        </div>
                    </div>

                    <div className={s.section}>
                        <h3>ПРЯМАЯ ПРАВДА</h3>
                        <p className={s.truth}>Если ты НЕ ЗАРАБАТЫВАЕШЬ, при этом тебя нет в ДКМ - ТЫ ЗАНИМАЕШЬСЯ НЕНУЖНОЙ ХУЙНЕЙ</p>
                        <p className={s.conclusion}>Это самое лучшее решение, которое работает прямо сейчас.</p>
                    </div>
                </div>

                <div className={s.buttonContainer}>
                    <Button href="https://t.me/winsdairencommunity" style={{  marginBottom: '2.5rem' }}>
                        <p>ОТЗЫВЫ</p>
                    </Button>
                    <Button href="https://t.me/dairencommunity_bot?start=0" style={{  marginBottom: '2.5rem' }}>
                        <p>ПРИСОЕДИНИТЬСЯ К ДКМ</p>
                    </Button>
                </div>
                </>
            )}
        </div>
    )
} 