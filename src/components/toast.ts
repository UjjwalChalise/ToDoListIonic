import { toastController } from '@ionic/core';

export async function presentToast(message: string, duration: number) {
  const toast = await toastController.create({
    message: message,
    duration: duration,
    position: 'bottom',
  });

  await toast.present();

  toast.onDidDismiss().then(() => {
    toastController.dismiss();
  });
}