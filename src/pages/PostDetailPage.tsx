import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import supabase from '../lib/supabase'

type Post = {
  id: string
  title: string
  content: string
  created_at: string
  count_views: number
  posted_by: string
}

export function PostDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return

      try {
        // First get the post
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', id)
          .single()

        if (error) throw error
        
        setPost(data)

        // Then increment view count
        const { error: updateError } = await supabase
          .from('posts')
          .update({ count_views: (data.count_views || 0) + 1 })
          .eq('id', id)

        if (updateError) console.error('Error updating view count:', updateError)
      } catch (err) {
        console.error('Error fetching post:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  if (loading) {
    return <div className="container mx-auto py-8 text-center">Loading post...</div>
  }

  if (!post) {
    return <div className="container mx-auto py-8 text-center">Post not found</div>
  }

  return (
    <div className="container mx-auto py-8">
      <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
        Voltar
      </Button>
      
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">{post.title}</CardTitle>
          <CardDescription>
            Posted on {new Date(post.created_at).toLocaleDateString()} • {post.count_views} views
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={() => navigate('/')}>
            Voltar para Início
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}