import {Field, Formik} from 'formik'
import React from 'react'
import {useSelector} from 'react-redux'
import {FilterType} from '../../redux/users-reducer'
import {getUsersFilter} from '../../redux/users-selectors'
import {Button} from 'antd'

const userSearchFormValidate = (values: any) => {
    const errors = {}
    return errors
}
type FriendFormType = 'true' | 'false' | 'null'

type FormType = {
    term: string
    friend: string
}
type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

export const UserSearchForm: React.FC<PropsType> = React.memo((props) => {
        const filter = useSelector(getUsersFilter)
        const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
            const filter: FilterType = {
                term: values.term,
                friend: values.friend === 'true'
                    ? true
                    : values.friend === 'false' ? false : null
            }

            props.onFilterChanged(filter)
            setSubmitting(false)
        }

        return <div>
            <Formik
                enableReinitialize
                initialValues={{term: filter.term, friend: String(filter.friend) as FriendFormType}}
                validate={userSearchFormValidate}
                onSubmit={submit}
            >
                {({
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      /* and other goodies */
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="term"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
                        </Field>
                        <Button htmlType='submit' disabled={isSubmitting}>
                            Find
                        </Button>
                    </form>
                )}
            </Formik>
        </div>
    }
)

//oldFilter
//term: values.term,
//friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false