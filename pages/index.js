import { gql, GraphQLClient } from "graphql-request";
import Section from "../components/section";
import NavBar from "../components/NavBar";
import Link from "next/link";
import Image from "next/image";
import disneyLogo from "../public/disney.png";
import pixarLogo from "../public/pixar.png";
import starwarsLogo from "../public/starwars.png";
import natgeoLogo from "../public/natgeo.png";
import marvelLogo from "../public/marvel.png";

export const getStaticProps = async () => {
  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    Headers: {
      Authorization: process.env.GRAPH_CMS_TOKEN,
    },
  });

  const videosQuery = gql`
    query {
      videos {
        createdAt
        id
        title
        description
        seen
        slug
        tags
        thumbnail {
          url
        }
        mp4 {
          url
        }
        banner {
          url
        }
      }
    }
  `;
  const accountQuery = gql`
    query {
      account(where: { id: "ckxsytdyo0zxm0b3365odyran" }) {
        username
        avatar {
          url
        }
      }
    }
  `;

  const data = await graphQLClient.request(videosQuery);
  const videos = data.videos;
  const accountData = await graphQLClient.request(accountQuery);
  const account = accountData.account;

  return {
    props: {
      videos,
      account,
    },
  };
};
const Home = ({ videos, account }) => {
  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)];
  };

  const filterVideos = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre));
  };

  const unSeenVideos = (videos) => {
    return videos.filter(
      (video) => video.seen === false || video.seen === null
    );
  };

  return (
    <>
      <NavBar account={account} />
      <div className="app">
        <div className="main-video">
          <img
            src={randomVideo(videos).banner.url}
            alt={randomVideo(videos).title}
          />
        </div>
        <div className="video-feed">
          <Link href="#disney">
            <div className="franchise" id="disney">
              <Image src={disneyLogo} />
            </div>
          </Link>
          <Link href="#pixar">
            <div className="franchise" id="pixar">
              <Image src={pixarLogo} />
            </div>
          </Link>
          <Link href="#star-wars">
            <div className="franchise" id="star-wars">
              <Image src={starwarsLogo} />
            </div>
          </Link>
          <Link href="#nat-geo">
            <div className="franchise" id="nat-geo">
              <Image src={natgeoLogo} />
            </div>
          </Link>
          <Link href="#marvel">
            <div className="franchise" id="marvel">
              <Image src={marvelLogo} />
            </div>
          </Link>
        </div>

        <Section genre={"Recomendados"} videos={unSeenVideos(videos)} />
        <Section genre={"Família"} videos={filterVideos(videos, "Família")} />
        <Section
          id="star-wars"
          genre={"Star-Wars"}
          videos={filterVideos(videos, "star-wars")}
        />
        <Section genre={"Amizade"} videos={filterVideos(videos, "Amizade")} />
        <Section
          id="disney"
          genre={"Disney"}
          videos={filterVideos(videos, "Disney")}
        />
        <Section genre={"Drama"} videos={filterVideos(videos, "Drama")} />
        <Section
          id="pixar"
          genre={"Pixar"}
          videos={filterVideos(videos, "pixar")}
        />
        <Section genre={"Animação"} videos={filterVideos(videos, "Animação")} />
        <Section genre={"Fantasia"} videos={filterVideos(videos, "Fantasia")} />
        <Section
          id="marvel"
          genre={"Marvel"}
          videos={filterVideos(videos, "marvel")}
        />
        <Section genre={"Musical"} videos={filterVideos(videos, "Musical")} />
        <Section
          id="nat-geo"
          genre={"Nat-Geo"}
          videos={filterVideos(videos, "nat-geo")}
        />
        <Section
          genre={"Ação e Aventura"}
          videos={filterVideos(videos, "Ação e Aventura")}
        />
      </div>
    </>
  );
};

export default Home;
