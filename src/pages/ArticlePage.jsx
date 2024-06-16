import useUser from "../hooks/useUser"

const ArticlePage = () => {
    const {user, isLoading} = useUser();

    return (
        
        <div>{user ? <h4>Article Page</h4> : <h4>Not Logged In</h4>}</div>
    )
}

export default ArticlePage