import { gql, GraphQLClient } from "graphql-request"
import Section from "../components/section"



export const getStaticProps = async () => {

  const url = process.env.ENDPOINT
  const graphQLClient = new GraphQLClient(url, {
    Headers: {
      "Authorization": process.env.GRAPH_CMS_TOKEN
    }
  })

  const query = gql `
    query {
    videos {
      createdAt,
      id,
      title,
      description,
      seen,
      slug,
      tags,
      thumbnail {
        url
      }
      mp4 {
        url
      }
    }
  }
  `

  const data = await graphQLClient.request(query)
  const videos = data.videos

  return {
    props: {
      videos,
    }
  }

}
const Home = ({ videos }) => {
  
  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)] 
  }

  const filterVideos = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre))
  }

  return (
    <>
    <div className="app">
      <div className="main-video">
        <img src={randomVideo(videos).thumbnail.url} alt={randomVideo(videos).title}/>
      </div>
      <div className="video-feed">
        <Section genre={'Família'} videos={filterVideos(videos, 'Família')}/>
        <Section genre={'Amizade'} videos={videos}/>
        <Section genre={'Drama'} videos={videos}/>
        <Section genre={'Animação'} videos={videos}/>
        <Section genre={'Fantasia'} videos={videos}/>
        <Section genre={'Musical'} videos={videos}/>
        <Section genre={'Trailer'} videos={videos}/>
        <Section genre={'Ação e Aventura'} videos={videos}/>
      </div>
    </div>
    
    </>
  
  )
}

export default Home
