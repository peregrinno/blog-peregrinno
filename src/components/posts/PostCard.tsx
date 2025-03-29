import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Link } from 'react-router-dom'

type Post = {
  id: string
  title: string
  content: string
  created_at: string
  count_views: number
  posted_by: string
}

type PostCardProps = {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>
          Publicado em {new Date(post.created_at).toLocaleDateString()} • {post.count_views} visualizações
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3">{post.content}</p>
      </CardContent>
      <CardFooter>
        <Link to={`/post/${post.id}`}>
          <Button variant="outline">Ler Mais</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}