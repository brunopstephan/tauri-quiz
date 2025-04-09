import silly from '../../assets/imgs/silly.jpg';
import cachorro_puto from '../../assets/imgs/cachorro_puto.jpg';
import corinthians from '../../assets/imgs/corinthianss.jpg';
import gatomoiado from '../../assets/imgs/gatomoiado.jpg';
import monday from '../../assets/imgs/monday.jpg';
import chaves from '../../assets/imgs/chaves.jpg';

export function Settings() {
    const images = [
        silly,
        cachorro_puto,
        corinthians,
        gatomoiado,
        chaves,
        monday
    ]

    const randomIndex = Math.floor(Math.random() * images.length);
    return (
        <div className='flex flex-col items-center justify-center'>
            <img src={images[randomIndex]} className='w-[50rem] h-[20rem]' />
        </div>
    );
}