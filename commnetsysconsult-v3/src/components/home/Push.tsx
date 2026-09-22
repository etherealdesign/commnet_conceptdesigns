import { useState, type FormEvent } from 'react'
import { Block } from '@/components/shared/Block'
import { Button } from '@/components/shared/Button'
import { Parallax } from '@/components/shared/Parallax'
import { AnimText } from '@/components/motion/AnimText'
import { SlideGroup, SlideItem } from '@/components/motion/SlideIn'
import { useHeaderStore } from '@/components/shared/HeaderStore'
import { push } from '@/data/home'

/**
 * The reference's newsletter push on its patterned sand ground: heading,
 * paragraph, a pill field and a Register button on the left; a drifting
 * photograph on the right. Ours asks for an email and opens the enquiry
 * with it filled in.
 */
export function Push() {
  const { setModalOpen, setContactEmail } = useHeaderStore()
  const [email, setEmail] = useState('')
  const submit = (e: FormEvent) => {
    e.preventDefault()
    setContactEmail(email)
    setModalOpen(true)
  }
  return (
    <Block className="margin-px-1 my-[var(--spacing-fluid-xl)]" ariaLabel={push.title}>
      <div className="pattern-ground rounded-[20px] px-6 py-[var(--spacing-fluid-lg)] md:px-[var(--margin)] md:py-[var(--spacing-fluid-2xl)]">
        <SlideGroup className="flex flex-col gap-[var(--spacing-fluid-lg)] md:flex-row md:items-center md:gap-[var(--gutter)]">
          <SlideItem className="flex flex-col gap-5 md:w-5/12" index={0}>
            <h2 className="sr-only">{push.title}</h2>
            <AnimText text={push.title} className="heading-sm max-w-[16ch]" ariaHidden />
            <p className="text-md max-w-md text-grey">{push.body}</p>
            <form onSubmit={submit} className="mt-2 flex flex-wrap items-center gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                aria-label="Email"
                className="pill-field h-10 min-w-[16rem] flex-1 rounded-[20px] border border-line-grey bg-white px-4 text-[0.875rem] outline-none focus:border-ink"
              />
              <Button type="submit">Register</Button>
            </form>
          </SlideItem>
          <SlideItem className="md:ml-auto md:w-6/12" index={1}>
            <div className="plate aspect-[16/10] w-full">
              <Parallax distance={40} className="h-full w-full">
                <img src={push.media} alt={push.mediaAlt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </Parallax>
            </div>
          </SlideItem>
        </SlideGroup>
      </div>
    </Block>
  )
}
