// this file use to convert the image
export default function convetBase64(file){
    return new Promise((resolve, reject) =>{
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result)
        }

        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}