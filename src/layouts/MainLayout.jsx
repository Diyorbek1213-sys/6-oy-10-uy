import Header from "../components/Header"


function MainLayout({ children }) {
  return (
    <div>
      <Header></Header>
      <div className="container mx-auto">
        {children}
      </div>
    </div>
  )
}

export default MainLayout