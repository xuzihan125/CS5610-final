import RandomRecipes from './Components/RandomRecipes.js'
import RecentUsers from './Components/RecentUsers.js'
import { useSelector } from 'react-redux';

function Home() {

    const { currentUser } = useSelector((state) => state.userReducer);

    return (
        <div className="container-fluid">
            <div className="d-none d-md-block">
                {
                    !currentUser && (
                        <RandomRecipes />
                    )
                }
                {
                    currentUser && (
                        <div className="row">
                            <div className="col-10">
                                <RandomRecipes />
                            </div>
                            <div className="col-2">
                                <RecentUsers />
                            </div>

                        </div>
                    )
                }
            </div>
            <div className="d-block d-md-none">
                {
                    !currentUser && (
                        <RandomRecipes />
                    )
                }
                {
                    currentUser && (
                        <div>
                            <div className="">
                                <RandomRecipes />
                            </div>
                            <div className="">
                                <RecentUsers />
                            </div>
                        </div>



                    )
                }
            </div>
        </div>
    )




}

export default Home;
