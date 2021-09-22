import Layout from "@/components/ui/Layout"
import Page from "@/components/ui/Page"
import { NextPage } from "next"

const LoginPage: NextPage = () => {

    const meta = {
        title: 'Login',
        description: 'Login into spotify'
    }

    return (
        <Page meta={meta}>
            <Layout>
                <div className="container mx-auto max-w-lg">
                    <h1>Login</h1>
                </div>
            </Layout>
        </Page>
    )

}

export default LoginPage;