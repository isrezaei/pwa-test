import unstable_serialize from "swr";
import {SWRConfig} from "swr/_internal";
import Hello from "../components/Hello";

export const FETCH_ACCESS_TOKEN = async () =>
{
  //?GET ACCESS TOKEN BY REFRESH TOKEN (WHEN EXPIRED ACCESS TOKEN)
  const refresh_token = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(
            `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token,
      }),
    })
    const data = await response.json();
    return data.access_token;
  }
  catch (e) {
    console.log('access token error')
  }
}
export async function getNewReleasesAlbums() {
  const token = await FETCH_ACCESS_TOKEN();
  const getData = await fetch("https://api.spotify.com/v1/search?q=lil%2520genre%3Apop&type=album&market=us&limit=12" , {
    headers : {
      Authorization: `Bearer ${token}`
    }
  })
  const res = await getData.json()
  console.log(res)
  return res
}





export default function Home({fallback}) {
  return (
      <SWRConfig value={{fallback}}>
        <Hello/>
      </SWRConfig>
  )
}

export const getServerSideProps = async ({req, res}) => {
  const GET_NEW_RELEASES = await getNewReleasesAlbums()
  console.log(GET_NEW_RELEASES)
  return {
    props: {
      fallback: {
       "GET_NEW_RELEASES" : GET_NEW_RELEASES,
      },
    },
  }
}
