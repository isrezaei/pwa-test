import {getNewReleasesAlbums} from "../pages";
import useSWR from 'swr'
import Image from "next/image";



const Hello = () => {

    const {data : {albums : {items}}} = useSWR("GET_NEW_RELEASES" , async () => await getNewReleasesAlbums(), {refreshInterval: false});

    console.log(items)


    return (
        <div>
            {items.map(value => {
                return (
                    <div key={value.id}>
                        <h2>{value.name}</h2>
                        <Image width={250} height={250} src={value.images[0].url} />
                    </div>
                )
            })}
        </div>
    );
};

export default Hello;