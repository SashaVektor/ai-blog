
import React, { FC } from 'react'
import Image from 'next/image'
import Twitter from "/public/assets/social_twitter.png";
import Facebook from "/public/assets/social_facebook.png";
import Instagram from "/public/assets/social_instagram.png";
import Google from "/public/assets/social_google.png";
import Discord from "/public/assets/social_discord.png";

interface SocialLinksProps {
    isDark?: boolean
}

const SocialLinks: FC<SocialLinksProps> = ({ isDark = false }) => {
    return (
        <div className='flex justify-between items-center gap-7'>
            <div>
                <a href="https://twitter.com" target='_blank' rel='noreferrer'>
                    <Image
                        className={`${isDark ? "brightness-0" : ""} hover:opacity-50`}
                        alt='twitter'
                        src={Twitter}
                        width={20}
                        height={20}
                    />
                </a>
            </div>
            <div>
                <a href="https://facebook.com" target='_blank' rel='noreferrer'>
                    <Image
                        className={`${isDark ? "brightness-0" : ""} hover:opacity-50`}
                        alt='twitter'
                        src={Facebook}
                        width={20}
                        height={20}
                    />
                </a>
            </div>
            <div>
                <a href="https://instagram.com" target='_blank' rel='noreferrer'>
                    <Image
                        className={`${isDark ? "brightness-0" : ""} hover:opacity-50`}
                        alt='twitter'
                        src={Instagram}
                        width={20}
                        height={20}
                    />
                </a>
            </div>
            <div>
                <a href="https://google.com" target='_blank' rel='noreferrer'>
                    <Image
                        className={`${isDark ? "brightness-0" : ""} hover:opacity-50`}
                        alt='twitter'
                        src={Google}
                        width={20}
                        height={20}
                    />
                </a>
            </div>
            <div>
                <a href="https://discrord.com" target='_blank' rel='noreferrer'>
                    <Image
                        className={`${isDark ? "brightness-0" : ""} hover:opacity-50`}
                        alt='twitter'
                        src={Discord}
                        width={20}
                        height={20}
                    />
                </a>
            </div>
        </div>
    )


}

export default SocialLinks
