import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { PostCard } from '../components/posts/PostCard'
import supabase from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

type Post = {
  id: string
  title: string
  content: string
  created_at: string
  count_views: number
  posted_by: string
}

export function HomePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        
        setPosts(data || [])
      } catch (err) {
        console.error('Erro ao buscar posts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Peregrinno</h1>
        {user ? (
          <Link to="/create">
            <Button>Criar Post</Button>
          </Link>
        ) : (
          <Link to="/login">
            <Button>Entrar para Postar</Button>
          </Link>
        )}
      </div>

      {loading ? (
        <div className="text-center">Carregando posts...</div>
      ) : posts.length === 0 ? (
        <div className="text-center">
          <p className="mb-4">Nenhum post ainda. Seja o primeiro a criar um!</p>
          {user && (
            <Link to="/create">
              <Button>Criar Post</Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}