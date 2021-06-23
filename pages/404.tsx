/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import styles from "../styles/404.module.css"
export interface PageNotFoundProps {
    
}
 
const PageNotFound: React.SFC<PageNotFoundProps> = () => {
    return ( 
        <div className={[styles.content, "min-h-screen flex bg-black"].join(" ")}>
      <div className="relative hidden xl:block xl:w-3/5 h-screen">
        <img className="h-screen" src="./background.png" alt="bg" />
      </div>
      <div className="group xl:w-2/5 rounded-lg mx-12 my-12 xl:ml-16 xl:mr-72 xl:mt-44">
        <div>
          <a href="https://techanalogy.org">
            <Image src="/Logotech.png" width={420} height={150} alt="logo" />
          </a>
          <h2 className="mt-16 text-6xl font-extrabold text-white">
            Seems like you strayed off
          </h2>
        </div>
        
      </div>
    </div>
     );
}
 
export default PageNotFound;