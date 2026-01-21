import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us | LuxeMarket',
    description: 'Learn about LuxeMarket’s mission to provide premium essentials for a modern lifestyle.',
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
