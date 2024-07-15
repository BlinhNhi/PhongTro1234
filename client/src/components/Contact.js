import { text } from "../ultils/data/dataContact";
import { Button } from '../components';
function Contact() {
  return (
    <div className="  bg-white rounded-md shadow-md p-4 w-3/5 flex flex-col items-center justify-center gap-6 border-blue-100 border-8 border-dashed ">
      <img alt="contact" src={text.image} className="w-full h-48 object-contain"></img>
      <p className="">
        {text.content}
      </p>
      <div className="flex w-full items-center justify-around">
        {text.support.map((item, index) => {
          return (
            <div className="flex flex-col justify-center items-center" key={index}>
              <span className="text-orange-500 font-semibold ">{item.text}</span>
              <span className="text-blue-900 text-[24px] font-semibold">{item.phone}</span>
              <span className="text-blue-900 text-[24px] font-semibold">{item.zalo}</span>
            </div>
          )
        })}
      </div>
      <Button text={'Gửi Liên Hệ'} bgColor='bg-blue-500' textColor='text-white' px='px-10'></Button>
    </div>
  );
}

export default Contact;