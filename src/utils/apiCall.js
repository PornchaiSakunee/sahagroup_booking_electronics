
const baseUrl = 'https://api-prd.spi.co.th/fair-event-order'

const config = {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJ1c2VybmFtZSI6ImthY2hhdGhvbiIsInVzZXJfaWQiOjMsInBhc3NfZWRpdCI6IjEiLCJyb2xlcyI6eyJ2aXAiOnRydWUsImhvbWUiOnRydWUsImFkbWluIjp0cnVlLCJkb25hdGUiOnRydWUsImV4cG9ydCI6dHJ1ZSwibWd1c2VyIjp0cnVlLCJwZXJpb2QiOnRydWUsInNlbGxlciI6dHJ1ZSwiY29udGFjdCI6dHJ1ZSwicHJvZmlsZSI6dHJ1ZSwic2hpcHBpbmciOnRydWUsImRhc2hib2FyZCI6dHJ1ZSwicGxhbnNldHVwIjp0cnVlLCJzYWhhZ3JvdXAiOnRydWUsImRvbmF0ZWFkbWluIjp0cnVlLCJwYXJraW5ndGlja2V0Ijp0cnVlLCJzYWhhZ3JvdXBBZG1pbiI6dHJ1ZX0sImxpbmVuYW1lIjpudWxsLCJyZWdpc3JlZiI6bnVsbCwiY3VzX251bWJlciI6IjUxMDAwNSIsImN1c19jb21wYW55Ijoi4Lia4Lij4Li04Lip4Lix4LiXIOC5gOC4muC4quC4l-C5jCDguYHguJ_guITguJXguK3guKPguLXguYgg4LmA4Lit4Liy4LiX4LmM4LmA4Lil4LmH4LiXIOC4iOC4s-C4geC4seC4lCIsImN1c19hZGRyZXNzIjoiNjI5IOC4q-C4oeC4ueC5iCAxMSDguJbguJnguJnguKrguLjguILguLLguKDguLTguJrguLLguKUgOCIsImN1c19kaXN0cmljdCI6IuC4reC4s-C5gOC4oOC4reC4qOC4o-C4teC4o-C4suC4iuC4siIsImN1c19wcm92aW5jZSI6IuC4iOC4seC4h-C4q-C4p-C4seC4lOC4iuC4peC4muC4uOC4o-C4tSIsImN1c196aXBjb2RlIjoiMjAyMzAiLCJjdXNfdGF4aWQiOiIwMjU1NTM3MDAwMjYwIiwiaWQiOjN9LCJ1c2VyQWJpbGl0aWVzIjp7ImFkbWluIjp0cnVlLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNzE0MDE1NjA3LCJleHAiOjE3MjQwMjUwMDd9.7XQjqDjxXZUOycuHOo716wjkwTRIuVutSkfZ0u2ngLk '

        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // body: JSON.stringify(data) // body data type must match "Content-Type" header
}


export const getFormItem = async (masterId, formId) => {
    console.log("masterId", masterId);
    let url = ` ${baseUrl}/fair/${masterId}/forms/${formId}`

    const response = await fetch(url, config)
    const dataOBJ = await response.json()


    return dataOBJ

}

export const getFormHistory = async () => {
    let url = ` ${baseUrl}/forms/history`

    const response = await fetch(url, config)
    const dataOBJ = await response.json()


    return dataOBJ

}

export const getForm = async (masterId) => {
    let url = ` ${baseUrl}/fair/${masterId}/forms`

    const response = await fetch(url, config)
    const dataOBJ = await response.json()


    return dataOBJ

}

export const cancelForm = async (id_fair, id_tran, id_form_q) => {
    let url = ` ${baseUrl}/forms/${id_fair}/form_request/${id_tran}/${id_form_q}`

    const response = await fetch(url, { ...config, method: "PATCH" })
    const dataOBJ = await response.json()


    return dataOBJ

}

export const delForm = async (id_fair, id_tran, id_form_q) => {
    let url = ` ${baseUrl}/forms/${id_fair}/form_request/${id_tran}/${id_form_q}`

    const response = await fetch(url, { ...config, method: "DELETE" })
    const dataOBJ = await response.json()


    return dataOBJ

}


export const AddForm = async (data, id) => {
    let url = ` ${baseUrl}/forms/${id}`

    const response = await fetch(url, { ...config, method: "POST", body: JSON.stringify({ ...data }) })
    const dataOBJ = await response.json()


    return dataOBJ

}

export const getAddress = async () => {
    let url = ` ${baseUrl}/address`

    const response = await fetch(url, config)
    const dataOBJ = await response.json()


    return dataOBJ

}

export const insertAddress = async (data) => {
    let url = ` ${baseUrl}/address`
    const response = await fetch(url, { ...config, method: "POST", body: JSON.stringify({ ...data }) })
    const dataOBJ = await response.json()

    return dataOBJ

}

export const updateAddress = async (data, id) => {
    let url = ` ${baseUrl}/address/${id}`
    const response = await fetch(url, { ...config, method: "PATCH", body: JSON.stringify({ ...data }) })
    const dataOBJ = await response.json()

    return dataOBJ

}

export const delAddress = async (id) => {
    let url = ` ${baseUrl}/address/${id}`
    const response = await fetch(url, { ...config, method: "DELETE" })

    const dataOBJ = await response.json()

    return dataOBJ

}


export const getTrans = async (masterId) => {
    let url = ` ${baseUrl}/fair/${masterId}/trans`

    const response = await fetch(url, config)
    const dataOBJ = await response.json()


    return dataOBJ

}

export const getProvinces = async () => {
    let url = ` ${baseUrl}/address/provinces`

    const response = await fetch(url, { ...config, method: "POST" })
    const dataOBJ = await response.json()


    return dataOBJ

}

export const getAmphures = async (province_id) => {
    let url = ` ${baseUrl}/address/amphures`

    const response = await fetch(url, { ...config, method: "POST", body: JSON.stringify({ province_id }) })
    const dataOBJ = await response.json()


    return dataOBJ

}

export const getDistricts = async (amphure_id) => {
    let url = ` ${baseUrl}/address/districts`

    const response = await fetch(url, { ...config, method: "POST", body: JSON.stringify({ amphure_id }) })
    const dataOBJ = await response.json()


    return dataOBJ

}






