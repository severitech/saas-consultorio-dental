import React from 'react';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'motion/react';
import {
    FacebookIcon,
    FrameIcon,
    InstagramIcon,
    LinkedinIcon,
    YoutubeIcon,
} from 'lucide-react';
import { Button } from './button';

interface FooterLink {
    title: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
}
interface FooterLinkGroup {
    label: string;
    links: FooterLink[];
}

type StickyFooterProps = React.ComponentProps<'footer'>;

export function StickyFooter({ className, ...props }: StickyFooterProps) {
    return (
        <footer
            // Ajustamos la altura: auto en móvil para que no se corte el contenido, fija en LG
            className={cn('relative h-auto lg:h-[350px] w-full m-0 bg-background', className)}
            style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
            {...props}
        >
            {/* En móvil usamos relative para que el scroll fluya normal, 
               en LG usamos fixed para el efecto de revelado 
            */}
            <div className="relative lg:fixed bottom-0 h-auto lg:h-[350px] w-full bg-background">
                <div className="h-full">
                    <div className="relative flex size-full flex-col justify-between gap-8 border-t px-6 py-10 md:px-12">
                        
                        {/* Background Decorativo - Optimizado para no romper el layout */}
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0 isolate z-0 overflow-hidden"
                        >
                            <div className="bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,transparent_100%)] absolute top-0 left-0 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full" />
                        </div>

                        {/* Contenido Principal */}
                        <div className="z-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-12">
                            
                            {/* Columna Marca */}
                            <AnimatedContainer className="lg:col-span-1 space-y-6">
                                <div className="flex items-center gap-2">
                                    <FrameIcon className="size-8 text-cyan-500" />
                                    <span className="text-lg font-bold tracking-tight">Severitech</span>
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                                    Infraestructura financiera innovadora para potenciar negocios mediante pagos inteligentes y tecnología escalable.
                                </p>
                                <div className="flex gap-3">
                                    {socialLinks.map((link) => (
                                        <Button key={link.title} size="icon" variant="outline" className="size-9 rounded-full hover:bg-muted transition-colors">
                                            <link.icon className="size-4" />
                                        </Button>
                                    ))}
                                </div>
                            </AnimatedContainer>

                            {/* Grupos de Links - Grid adaptable */}
                            <div className="grid grid-cols-2 gap-8 sm:col-span-1 lg:col-span-4 lg:grid-cols-4">
                                {footerLinkGroups.map((group, index) => (
                                    <AnimatedContainer
                                        key={group.label}
                                        delay={0.1 + index * 0.05}
                                        className="space-y-4"
                                    >
                                        <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                                            {group.label}
                                        </h3>
                                        <ul className="space-y-2.5">
                                            {group.links.map((link) => (
                                                <li key={link.title}>
                                                    <a
                                                        href={link.href}
                                                        className="text-muted-foreground hover:text-cyan-500 text-sm transition-colors duration-200 inline-flex items-center group"
                                                    >
                                                        {link.icon && <link.icon className="me-2 size-4" />}
                                                        {link.title}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </AnimatedContainer>
                                ))}
                            </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className="z-10 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-6 text-xs text-muted-foreground md:flex-row">
                            <p>© 2026 Severitech, Inc. Todos los derechos reservados.</p>
                            <p className="flex items-center gap-1">
                                Desarrollado por: 
                                <a 
                                    href="https://douglaspadilla.dev/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-foreground font-medium hover:text-cyan-500 transition-colors"
                                >
                                    Douglas Padilla
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

// ... (Resto de arrays socialLinks y footerLinkGroups se mantienen igual)

const socialLinks = [
    { title: 'Facebook', href: '#', icon: FacebookIcon },
    { title: 'Instagram', href: '#', icon: InstagramIcon },
    { title: 'Youtube', href: '#', icon: YoutubeIcon },
    { title: 'LinkedIn', href: '#', icon: LinkedinIcon },
];

const footerLinkGroups: FooterLinkGroup[] = [
    {
        label: 'Sobre el producto',
        links: [
            { title: 'Payments', href: '#' },
            { title: 'Cards & Issuing', href: '#' },
        ],
    },
    {
        label: 'Soluciones',
        links: [
            { title: 'Startups', href: '#' },
            { title: 'Enterprises', href: '#' },
        ],
    },
    {
        label: 'Recursos',
        links: [
            { title: 'Blog', href: '#' },
            { title: 'Case Studies', href: '#' },
            { title: 'Documentation', href: '#' },
        ],
    },
    {
        label: 'Acerca de',
        links: [
            { title: 'Compañía', href: '#' },
            { title: 'Carreras', href: '#' },
            { title: 'Contacto', href: '#' },

        ],
    },
];


type AnimatedContainerProps = React.ComponentProps<typeof motion.div> & {
	children?: React.ReactNode;
	delay?: number;
};

function AnimatedContainer({
	delay = 0.1,
	children,
	...props
}: AnimatedContainerProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return children;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			{...props}
		>
			{children}
		</motion.div>
	);
}