import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import Link from "next/link";
import Image from "next/image";
import CardDeckSlider from "@/components/card-deck-slider";
import Background from "@/components/background";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <HydrateClient>
      <main className="t flex min-h-screen justify-center">
        <div className="container flex h-screen flex-col gap-4 px-4 py-8 md:gap-12">
          <nav className="flex items-center justify-between">
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-2xl font-bold text-transparent">
              Мероприятия 2024
            </span>
            <div className="flex gap-4">
              <Link href={"/signup"} className="hidden md:block">
                <Button variant={"outline"}>Зарегистрироваться</Button>
              </Link>
              <Link href={"/login"}>
                <Button className="bg-blue-500">Вход</Button>
              </Link>
            </div>
          </nav>
          <div className="mx-auto h-full w-full grow flex-col items-center justify-around gap-4 md:flex md:flex-row">
            <div className="flex flex-col gap-2 rounded-xl border p-8">
              <h1 className="text-2xl font-bold text-black md:text-4xl">
                Найдите своё <br />
                мероприятия здесь!
              </h1>
              <p className="md:text-2xl">
                Каждый день люди создают <br /> и регистрируются на различные{" "}
                <br />
                мероприятия на нашей платформе.
              </p>
              <div className="flex gap-4">
                <Link href={"/home"}>
                  <Button className="bg-blue-500">Найти</Button>
                </Link>
              </div>
            </div>
            <div className="flex h-full w-full max-w-[400px] pt-4 md:pt-12">
              <CardDeckSlider>
                <div className="relative flex h-full w-full rounded-xl bg-black">
                  <p className="text-md absolute bottom-4 left-0 z-[10] mx-4 rounded-xl bg-white/20 p-4 text-2xl font-medium text-white">
                    Каждый день регистрируются более 100 участников
                  </p>
                  <Image
                    src="https://i.pinimg.com/564x/8f/c2/b1/8fc2b14f75d58d816c4cfdc21b34c8f0.jpg"
                    alt=""
                    className="absolute left-0 top-0 z-0 h-full rounded-xl brightness-75"
                    width={400}
                    height={400}
                  />
                </div>
                <div className="relative flex h-full w-full rounded-xl">
                  <p className="text-md absolute bottom-4 left-0 z-[10] mx-4 rounded-xl bg-white/20 p-4 text-2xl font-medium text-white">
                    Каждый день регистрируются более 100 участников
                  </p>
                  <Image
                    src="https://i.pinimg.com/474x/fe/84/5e/fe845e93a72de38a0b06ab3998b6e832.jpg"
                    alt=""
                    className="absolute left-0 top-0 z-0 h-full rounded-xl brightness-75"
                    width={400}
                    height={400}
                  />
                </div>
                <div className="relative flex h-full w-full rounded-xl">
                  <p className="text-md absolute bottom-4 left-0 z-[10] mx-4 rounded-xl bg-white/20 p-4 text-2xl font-medium text-white">
                    Каждый день регистрируются более 100 участников
                  </p>
                  <Image
                    src="https://i.pinimg.com/564x/61/60/ec/6160ece294ffff6d338cb274ac7fa32c.jpg"
                    alt=""
                    className="absolute left-0 top-0 z-0 h-full rounded-xl brightness-75"
                    width={400}
                    height={400}
                  />
                </div>
              </CardDeckSlider>
            </div>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
