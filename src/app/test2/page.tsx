"use client"

import React, { useMemo, useState } from 'react'

type Direction = 'normal' | 'reverse'
type Layout = 'dashboard' | 'hero' | 'grid' | 'chart' | 'feed' | 'list'

type WebsiteItem = {
  title: string
  category: string
  primaryColor: string // tailwind class เช่น "bg-blue-600"
  layout: Layout
  image?: string
}

type RenderContentProps = {
  layout: Layout
  color: string
  image?: string
  title: string
}

type CardProps = {
  item: WebsiteItem
}

type ColumnProps = {
  items: WebsiteItem[]
  speed?: string
  direction?: Direction
  offset?: string
}

const IsometricMockup: React.FC = () => {
  const websites: WebsiteItem[] = useMemo(
    () => [
      {
        title: 'Patient Dashboard',
        category: 'OPD Records',
        primaryColor: 'bg-blue-600',
        layout: 'dashboard',
        image: '/images/projects/patient-overview.png',
      },
      {
        title: 'Radiology AI',
        category: 'X-Ray Scan',
        primaryColor: 'bg-blue-500',
        layout: 'hero',
        image: '/images/projects/radiology.png',
      },
      {
        title: 'Smart Pharmacy',
        category: 'Dispensing',
        primaryColor: 'bg-sky-500',
        layout: 'grid',
        image: '/images/projects/pharmacy.png',
      },
      {
        title: 'Vital Signs',
        category: 'Real-time',
        primaryColor: 'bg-indigo-500',
        layout: 'chart',
        image: '/images/projects/vitals.png',
      },
      {
        title: 'Tele-Consult',
        category: 'Online',
        primaryColor: 'bg-blue-400',
        layout: 'feed',
        image: '/images/projects/telemedicine.png',
      },
      {
        title: 'Doctor Schedule',
        category: 'Management',
        primaryColor: 'bg-slate-500',
        layout: 'list',
        image: '/images/projects/schedule.png',
      },
    ],
    []
  )

  const RenderContent: React.FC<RenderContentProps> = ({ layout, color, image, title }) => {
    const [imgError, setImgError] = useState(false)

    if (image && !imgError) {
      return (
        <div className="w-full h-full bg-white relative">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-top"
            onError={() => setImgError(true)}
          />
        </div>
      )
    }

    switch (layout) {
      case 'dashboard':
        return (
          <div className="flex h-full bg-white p-8 gap-8 pt-16">
            <div className="w-1/4 h-full bg-blue-50/50 rounded-3xl p-6 space-y-4">
              <div className="h-4 w-12 rounded-full bg-blue-200 mb-6" />
              <div className="h-3 w-full rounded-full bg-blue-100" />
              <div className="h-3 w-3/4 rounded-full bg-blue-100" />
            </div>

            <div className="flex-1 space-y-6">
              <div className="flex gap-6 h-1/2">
                <div className="flex-1 rounded-3xl bg-blue-50/50 p-6 relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-full h-2 ${color}`} />
                  <div className="h-5 w-24 rounded bg-blue-200 mb-4" />
                  <div className="h-3 w-32 rounded bg-blue-100" />
                </div>

                <div className="flex-1 rounded-3xl bg-blue-50/50 p-6 relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-full h-2 ${color}`} />
                  <div className="h-5 w-24 rounded bg-blue-200 mb-4" />
                  <div className="h-3 w-32 rounded bg-blue-100" />
                </div>
              </div>

              <div className="h-[40%] rounded-3xl bg-blue-50/50 p-6">
                <div className="h-4 w-1/3 rounded bg-blue-200 mb-4" />
                <div className="h-3 w-full rounded bg-blue-100" />
              </div>
            </div>
          </div>
        )

      case 'hero':
        return (
          <div className="h-full bg-white p-10 pt-16 flex flex-col justify-center relative overflow-hidden">
            <div
              className={`absolute -right-20 -top-20 w-80 h-80 ${color} rounded-full blur-[100px] opacity-10`}
            />
            <div className={`h-3 w-24 rounded-full ${color} mb-8`} />
            <div className="h-10 w-full rounded-2xl bg-blue-50 mb-4" />
            <div className="h-10 w-2/3 rounded-2xl bg-blue-50 mb-10" />
            <div className={`h-16 w-48 rounded-3xl ${color} shadow-xl shadow-blue-200/50 opacity-90`} />
          </div>
        )

      default:
        return (
          <div className="h-full p-10 pt-16 bg-white flex flex-col justify-center gap-8">
            <div className="flex gap-8 items-center">
              <div className="h-20 w-20 rounded-3xl bg-blue-50 flex items-center justify-center">
                <div className={`w-10 h-10 rounded-full ${color} opacity-40`} />
              </div>

              <div className="space-y-4 flex-1">
                <div className="h-4 w-1/2 rounded-full bg-blue-100" />
                <div className="h-3 w-3/4 rounded-full bg-slate-100" />
              </div>
            </div>

            <div
              className={`h-48 w-full rounded-3xl bg-gradient-to-r ${color.replace('bg-', 'from-')}/10 to-transparent p-8`}
            />
          </div>
        )
    }
  }

  const Card: React.FC<CardProps> = ({ item }) => {
    return (
      <div className="relative h-[560px] w-[900px] mb-[40px] shrink-0 group">
        <div
          className="h-full w-full rounded-[40px] bg-white overflow-hidden relative transition-transform duration-500 hover:-translate-y-4 hover:scale-[1.01]"
          style={{
            boxShadow: '0 60px 100px -30px rgba(30, 58, 138, 0.12)',
          }}
        >
          <div className="absolute top-8 left-8 z-30 flex gap-3">
            <div className="w-4 h-4 rounded-full bg-[#FF5F57] border border-black/5 hover:brightness-90 transition-all shadow-sm" />
            <div className="w-4 h-4 rounded-full bg-[#FEBC2E] border border-black/5 hover:brightness-90 transition-all shadow-sm" />
            <div className="w-4 h-4 rounded-full bg-[#28C840] border border-black/5 hover:brightness-90 transition-all shadow-sm" />
          </div>

          <RenderContent layout={item.layout} color={item.primaryColor} image={item.image} title={item.title} />

          <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent pointer-events-none z-10" />
        </div>
      </div>
    )
  }

  const Column: React.FC<ColumnProps> = ({ items, speed = '40s', direction = 'normal', offset = '0' }) => {
    const loopedItems = useMemo(() => [...items, ...items, ...items], [items])

    const style = {
      '--duration': speed,
      animation: `scroll-${direction === 'reverse' ? 'down' : 'up'} var(--duration) linear infinite`,
      transform: `translateY(${offset})`,
    } as React.CSSProperties

    return (
      <div className="flex flex-col relative" style={style}>
        {loopedItems.map((it, idx) => (
          <Card key={`${it.title}-${idx}`} item={it} />
        ))}
      </div>
    )
  }

  return (
    <>
      <style>{`
        @keyframes scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-33.333333%); }
        }
        @keyframes scroll-down {
          0% { transform: translateY(-33.333333%); }
          100% { transform: translateY(0); }
        }
      `}</style>

      <div className="w-full min-h-screen bg-[#F8FAFC] overflow-hidden flex items-center justify-center font-sans">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,1)_0%,rgba(241,245,249,1)_100%)] pointer-events-none" />

        <div
          className="relative w-full h-[150vh] flex items-center justify-center scale-50 md:scale-75 xl:scale-90"
          style={{
            perspective: '3000px',
            transformStyle: 'preserve-3d',
          }}
        >
          <div
            className="flex gap-12 justify-center"
            style={{
              transform: 'rotateX(25deg) rotateZ(-15deg) rotateY(10deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="opacity-90 transition-all duration-500 hover:opacity-100 hover:z-20 translate-x-24">
              <Column items={[websites[0], websites[4], websites[2], websites[5]]} speed="80s" />
            </div>

            <div className="opacity-100 relative z-10 -mt-[250px] translate-x-32">
              <Column items={[websites[1], websites[3], websites[0], websites[4]]} speed="60s" direction="reverse" />
            </div>

            <div className="opacity-90 transition-all duration-500 hover:opacity-100 hover:z-20 translate-x-40">
              <Column items={[websites[5], websites[2], websites[1], websites[3]]} speed="90s" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default IsometricMockup
