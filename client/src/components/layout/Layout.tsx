import Header from "./Header";
import Footer from "./Footer";

export function Layout({children} : {children : React.ReactNode}) {
  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout