import React, { FC, useState, ChangeEvent } from 'react'

const Demo: FC = () => {
  // const [text, setText] = useState<string>('123')
  // function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
  //   setText(event.target.value)
  // }
  // function getHtml() {
  //   return { __html: text.replaceAll('\n', '<br>') }
  // }

  // const [gender, setGender] = useState('male')
  // function handleChange(event: ChangeEvent<HTMLInputElement>) {
  //   setGender(event.target.value)
  // }

  // const [checked, setChecked] = useState(false)

  // function toggleChecked() {
  //   setChecked(!checked)
  // }

  const [selectedCityList, setSelectedCityList] = useState<string[]>([])

  function handleChangeCity(event: ChangeEvent<HTMLInputElement>) {
    const city = event.target.value
    if (selectedCityList.includes(city)) {
      setSelectedCityList(
        selectedCityList.filter(c => {
          if (c === city) return false
          return true
        })
      )
    } else {
      setSelectedCityList(selectedCityList.concat(city))
    }
  }

  const [lang, setLang] = useState('react')

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    setLang(event.target.value)
  }

  function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault()
    // ....
  }
  return (
    <>
      <p>Form elem demo</p>
      <div>
        <form action="/api/post" onSubmit={handleSubmit}>
          <input name="k1" value="v1" />
          <br />
          <textarea name="k2" value="2"></textarea>
          <br />
          <input type="hidden" name="k3" value="v3" />
          <button type="submit">提交</button>
        </form>
        {/* <input value={text} onChange={handleChange} type="text" /> */}
        {/* <textarea value={text} onChange={handleChange} />
        <p dangerouslySetInnerHTML={getHtml()}></p> */}

        {/* <label htmlFor="checkbox1">选中</label>
        <input type="checkbox" id="checkbox1" checked={checked} onChange={toggleChecked} /> */}
        <label htmlFor="checkbox1">北京</label>
        <input
          type="checkbox"
          id="checkbox1"
          value="beijing"
          checked={selectedCityList.includes('beijing')}
          onChange={handleChangeCity}
        />
        <label htmlFor="checkbox2">上海</label>
        <input
          type="checkbox"
          id="checkbox2"
          value="shanghai"
          checked={selectedCityList.includes('shanghai')}
          onChange={handleChangeCity}
        />
        <label htmlFor="checkbox3">广州</label>
        <input
          type="checkbox"
          id="checkbox3"
          value="guangzhou"
          checked={selectedCityList.includes('guangzhou')}
          onChange={handleChangeCity}
        />
        <label htmlFor="checkbox4">深圳</label>
        <input
          type="checkbox"
          id="checkbox4"
          value="shenzhen"
          checked={selectedCityList.includes('shenzhen')}
          onChange={handleChangeCity}
        />
        {JSON.stringify(selectedCityList)}
        <input type="hidden" name="cities" value={JSON.stringify(selectedCityList)} />
        <br />
        <select value={lang} onChange={handleSelectChange}>
          <option value="vuex">Vuex</option>
          <option value="vue">Vue</option>
          <option value="react">React</option>
        </select>
        {/* <label htmlFor="radio1">男</label>
        <input
          type="radio"
          id="radio1"
          name="gender"
          value="male"
          checked={gender === 'male'}
          onChange={handleChange}
        />
        <label htmlFor="radio2">女</label>
        <input
          type="radio"
          id="radio2"
          name="gender"
          value="female"
          checked={gender === 'female'}
          onChange={handleChange}
        /> */}
      </div>
    </>
  )
}

export default Demo
