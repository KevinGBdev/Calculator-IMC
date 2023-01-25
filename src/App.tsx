import styles from './App.module.css'
import powerImg from './assets/powered.png'
import { useState } from 'react'
import { levels, calcutateImc, Level } from './helpers/imc'
import { GridItem } from './components/GridItem'
import  leftArrowImg  from './assets/leftarrow.png'


const App = ()=>{
  const [heightField, setHeightField] = useState<number>(0)
  const [weightField, setWeightField] = useState<number>(0)
  const[showItem, setShowItem] = useState<Level | null>(null)

  const handleCalculate = ()=>{
    if(heightField && weightField){
      setShowItem(calcutateImc(heightField, weightField))
    }else{
      alert('Todos os Campos Obrigatórios')
    }
  }



  const handleBackButton = ()=>{
      setShowItem(null)
      setHeightField(0)
      setWeightField(0)
  }


  return(
    <div className={styles.main}>
        <header>
          <div className={styles.headerContainer}>
            <img src={powerImg} alt="" width={150} />
          </div>
        </header>
        <div className={styles.container}>
          <div className={styles.leftSide}>
              <h1>Calcule o seu IMC</h1>
              <p>IMC é a sigla para indice de massa corpórea. parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>
              <input type="number" placeholder='Digite Sua Altura. Ex: 1.5 (em métros)' value={heightField > 0 ? heightField : ''} onChange={e => setHeightField(parseFloat(e.target.value))} step='0.1' disabled={showItem ? true : false}/>

              <input type="number" placeholder='Digite Sua Altura. Ex: 75.3 (em kg)' value={weightField > 0 ? weightField : ''} onChange={e => setWeightField(parseFloat(e.target.value))}  step='0.1' disabled={showItem ? true : false}/>

              <button onClick={() =>handleCalculate()}  disabled={showItem ? true : false}>Calcular</button>
          </div>
          <div className={styles.rightSide}>
              {!showItem && 
                <div className={styles.grid}>
                    {levels.map((item, key)=>(
                      <GridItem key={key} item={item} />
                    ))}
                </div>  
              }
              {showItem &&
                <div className={styles.rightBig}>
                    <div className={styles.rightArrow} onClick={handleBackButton}>
                      <img src={leftArrowImg} alt="" width={25}/>
                    </div>
                    <GridItem item={showItem}/>
                </div>
              }
          </div>
        </div>
    </div>
  )
}
export default App;
