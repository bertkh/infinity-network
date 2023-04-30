import React from 'react'
import s from './News.module.css'
import {Button} from 'antd'
import {GithubOutlined, LinkedinOutlined} from '@ant-design/icons'


const News = () => {

    return (

        <div className={s.newsBlock}>

            <div>
                Test access for this project: <br/> <br/>
                Email: free@samuraijs.com
                <div className={s.someTab}></div>
                <Button
                    onClick={() => navigator.clipboard.writeText('free@samuraijs.com')}
                >
                    Copy
                </Button>
                <br/>
                Password: free
            </div>

            <div>
                <br/>
                Test - userId - 1079 - test profile -
                <div className={s.someTab}></div>
                <a
                    href="https://bertkh.github.io/profile/1079"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    click here
                </a>
            </div>

            <div>
                <br/>
                Albert Khamzin - userId - 26724 - my profile -
                <div className={s.someTab}></div>
                <a
                    href="https://bertkh.github.io/profile/26724"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    click here
                </a>
            </div>

            <div>
                <br/>
                And see my
                <div className={s.someTab}></div>
                <a
                    href="https://github.com/bertkh/react-infinity-app"
                    target="_blank"
                    rel="noopener noreferrer"
                ><GithubOutlined/> GitHub
                </a>&nbsp;
                for the full code
                <br/>
            </div>

            <div>
                <br/>
                You can ask me any questions in
                <div className={s.someTab}></div>
                <a
                    href="https://www.linkedin.com/in/bertqa/"
                    target="_blank"
                    rel="noopener noreferrer"
                ><LinkedinOutlined/> Linkedin
                </a>
                <br/>
                If some functional doesn't work correctly I can give you access to my own account.
            </div>

        </div>

    )
}

export default News