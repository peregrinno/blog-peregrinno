import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { useAuth } from '../../contexts/AuthContext'

export function Navbar() {
  const { user, signOut } = useAuth()

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Blog Peregrinno
        </Link>
        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <Link to="/">Início</Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to="/create">
                    <Button variant="outline">Criar Post</Button>
                  </Link>
                </li>
                <li>
                  <Button variant="ghost" onClick={signOut}>
                    Sair
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">
                    <Button variant="outline">Entrar</Button>
                  </Link>
                </li>
                <li>
                  <Link to="/register">
                    <Button>Cadastrar</Button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}