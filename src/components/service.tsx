import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardTitle } from './ui/card'
import { WobbleCard } from './ui/wobble-card'

export default function Service() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
            <WobbleCard
                containerClassName="col-span-1 lg:col-span-1 h-full min-h-[300px]"
                className=""
            >
                <Image
                    src="/jungle_logo.png"
                    alt="Compass Logo"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl"
                />
            </WobbleCard>

            <WobbleCard containerClassName="col-span-1 h-full min-h-[300px]">
                <a href="/twitch">
                    <Image
                        src="/twitch.png"
                        alt="Description of image"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-2xl"
                    />
                </a>
            </WobbleCard>

            <WobbleCard containerClassName="col-span-1 h-full min-h-[300px]">
                <a href="/bet">
                    <Image
                        src="/betbetbet.png"
                        alt="Description of image"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-2xl"
                    />
                </a>
            </WobbleCard>
        </div>
    )
}
