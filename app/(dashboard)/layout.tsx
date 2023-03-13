import '@/styles/global.css';
import GlassPane from "@/components/GlassPane";

export default function DashboardRootLayout({children}) {
    return (
        <html lang="en">
        <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body className="h-screen w-screen rainbow-mesh p-6">
            <GlassPane className="w-full h-full flex itemm-center justify-center">
            {children}
            </GlassPane>
        </body>
        </html>
    )
}