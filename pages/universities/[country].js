export default function Universities({ uni }) {
    
    return (
        <div>
            <h1>Universities in {uni[0].country}</h1>
            <ul>
                {uni.map((uni) => {
                    return (
                      <li key={uni}>
                        {uni.name}. Website: {uni.domains}
                      </li>
                    )
                })}
            </ul>
        </div>
    )
}

export async function getStaticProps({ params }) {
    const request = await fetch(`http://universities.hipolabs.com/search?country=${params.country}`);
    const data = await request.json()
    const uniArray = [data[0], data[1], data[2]]
    return {
        props : {uni: uniArray}
    }
}
export async function getStaticPaths() {
    const request = await fetch("http://universities.hipolabs.com/search?");
    const data = await request.json()
    return {
        paths : data.map( uni => {
            return {
                params: {country: uni.country}
            }
        }),
        fallback: false
    }
}