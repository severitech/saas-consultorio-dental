"use client"

import React from 'react';
import { StickyFooter } from "@/components/ui/sticky-footer";
import Lenis from '@studio-freight/lenis';

export default function DemoOne() {
    React.useEffect(() => {
        const lenis = new Lenis();

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }, []);

    return (

        <StickyFooter />

    );
}
