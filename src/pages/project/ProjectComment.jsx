import { useState } from "react"
import { timeStamp } from "../../firebase/config"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore"
import Avatar from "../../component/Avatar"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default function ProjectComment ({project}){
    const [newComment, setNewComment] = useState('')
    const { user } = useAuthContext()
    const { updateDocument, response } = useFirestore('projects')

    const handleSubmit = async(e) => {
        e.preventDefault()

        const comentToAdd = {
            dislayName : user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: timeStamp.fromDate(new Date()),
            id: Math.random().toString()
        }

        await updateDocument(project.id,{
            comments:[...project.comments, comentToAdd]
        })

        if(!response.error){
            setNewComment('')
        }
    }

    return(
        <div className="project-comments">
            <h4>Project Comments</h4>
            <ul>
                {project.comments.length > 0 && project.comments.map(comment => (
                    <li key={comment.id}>
                        <div className="comment-author">
                            <Avatar src={comment.photoURL} />
                            <p>{comment.dislayName}</p>
                        </div>
                        <div className="comment-date">
                            <p>{formatDistanceToNow(comment.createdAt.toDate(),{ addSuffix: true})}</p>
                        </div>
                        <div className="comment-content">
                            <p>{comment.content}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <form className="add-comment" onSubmit={handleSubmit}>
                <label>
                    <span>Add new comment</span>
                    <textarea required onChange={(e) => setNewComment(e.target.value)} value={newComment} />
                </label>
                <button className="btn">Add Comment</button>
            </form>
        </div>
    )
}