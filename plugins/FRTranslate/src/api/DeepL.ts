import { DeepLResponse } from "../type"

const API_URL = "https://api.deeplx.fun/translate"

const translate = async (text_data: string, source_lang_data: string = "auto", target_lang_data: string, original: boolean = false) => {
    try {
      let dataToSend = {
        "text": `${text_data}`,
        "source_lang": `${source_lang_data}`,
        "target_lang": `${target_lang_data}`
      }
      console.log(dataToSend)
        if (original) return { source_lang_data, text_data }
        const data: DeepLResponse = await (await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        })).json()
        if (data.code !== 200) throw Error(`Failed to translate text from DeepL: ${data.message}`)
        return { source_lang_data, text: data.data }
    } catch (e) {
        throw Error(`Failed to fetch from DeepL: ${e}`)
    }
}

export default { translate }

