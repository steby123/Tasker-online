import {useParams} from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'
import './Project.css'
import ProjectSummary from './ProjectSummary'
import ProjectComment from './ProjectComment'

const Project = () => {
    const {id} = useParams()
    const {error, document} = useDocument('projects', id)

    if(error){
        return <div className='error'>{error}</div>
    }
    if(!document){
        return <div className='loading'>Loading...</div>
    }

    return(
        <div className='project-details'>
            <ProjectSummary project={document}/>
            <ProjectComment project={document}/>
        </div>
    )
}

export default Project;