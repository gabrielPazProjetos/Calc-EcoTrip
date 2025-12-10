export default function Layout({ children }) {
  return (
    <div className="layout">
      <header className="header">
        <span className="logo">EcoTrip</span>
      </header>
      <main className="main">{children}</main>
      <footer className="footer">
        <span>Projeto EcoTrip</span>
      </footer>
    </div>
  );
}
