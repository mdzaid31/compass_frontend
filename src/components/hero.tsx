import React from 'react'
import { TextGenerateEffect } from './ui/text-generate-effect'

export default function Hero() {
    return (
        // <BackgroundGradientAnimation>
        <div className="flex justify-center relative my-20 z-10">
            <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
                <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
                    Join our platform now and play games to earn Compass XP and win different in-game items.
                </p>


                <TextGenerateEffect
                    words="Watch your favorite team play and risk all your points to win huge prizes"
                    className="text-center text-[40px] md:text-5xl lg:text-6xl"
                />

                <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
                    It's high risk high reward.
                </p>

            </div>
        </div>
        // </BackgroundGradientAnimation>
    )
}
