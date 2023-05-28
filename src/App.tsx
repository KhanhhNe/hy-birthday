import { FullScreen, useFullScreenHandle } from "react-full-screen"
import {
  ArrowsPointingOutIcon,
  ArrowRightCircleIcon,
  ArrowsPointingInIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  BackspaceIcon,
} from "@heroicons/react/24/solid"
import {
  ArrowRightIcon as OutlinedArrowRightIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline"
import React, { useRef, useState, useEffect } from "react"
import "./index.css"

type Video = {
  title: string
  body: string
}

const videosMap = {
  "31-3": {
    title: "31/3/2018",
    body: "Ngoại khóa THPT Lê Quý Đôn ĐN - Sun World cùng lớp. Lần đầu m đi xe hong say hong nôn gì cả, ra là do được kê tay ngủ suốt 6 tiếng ngồi xe 💪",
  },
  "16-6": {
    title: "16/6/2019",
    body: 'Đồi Thiên An (with Sương). Lâu lâu có dịp trải nghiệm "picnic" hehe. Nhân danh chụp ảnh cái m tranh thủ đè đầu cưỡi cổ t ngay 😤',
  },
  "5-9": {
    title: "5/9/2019",
    body: "Lần chụp ảnh ni cũng là 1 lần chụp ảnh trong nhìu nhìu lần t vs m đi chụp ảnh thui, nhưng tại thấy ảnh m hồi ni cũng cute nên coi như đây là cơ hội ngắm mình trong quá khứ z 😳",
  },
  "25-5": {
    title: "25/5/2019",
    body: "Một trong những chuyến đi chơi xa hồi c3 nè. Trải nghiệm lần đầu ngủ lều, ngoài trời của m, đợt ni chụp 1 đống ảnh lun mà hồi nớ chụp íu quá 😅",
  },
  "17-3": {
    title: "17/3/2019",
    body: "Đi chơi đền Huyền Trân Công Chúa nè. Hồi nớ chụp ảnh còn nhí nhảnh ghia 😁 kiếm mô ra cái que xong vác đi chụp đủ thứ kiểu",
  },
  "29-9": {
    title: "29/9/2020",
    body: "Đợt ni đi chơi xa vs hội bàn đầu, mà dậy cực sớm luôn để còn xuống đón m cho kịp. Chạy gần nửa cái đèo xong xe tk Đạt hết xăng nên lại thôi, mà vẫn chưa biết cầu vòm nhìn ra răng luôn 😄",
  },
  "18-7": {
    title: "18/7/2020",
    body: "Rủ nhau đi biển camping nè, mà chỗ ngta hạn chế đốt lửa mà mình cứ liều mạng nhóm lên nướng 😂 chín có sống có cháy có nhưng mà zui",
  },
  "21-2": {
    title: "21/2/2020",
    body: "Ghé trường chơi hồi năm 1 nè. Lần đầu trải nghiệm cảm giác cựu hsinh về thăm trường, cảm giác ngầu hẳn 😎",
  },
  "13-5": {
    title: "13/5/2020",
    body: "Tối chuồn học đi ăn chơi nè. Đợt ni t mới làm quả đầu mới m chê quá trời chê luôn 😂 nên là h vẫn tóc thả tự do truyền thống đóa",
  },
  "6-6": {
    title: "6/6/2020",
    body: "Rủ nhau đi ăn nướng Kicochi nè. Quán ni là một trong những quán nướng uy tín ở Huế mà cứ nghĩ tới nướng là mình đi á, tiếc là h khác trc nhìu rùi 🥺",
  },
  "1-10": {
    title: "1/10/2020",
    body: 'Chuyến đi Nha Trang đáng nhớ mà mn vẫn hay nói là m đi thi t đi tháp tùng. Trải nghiệm du lịch "tự túc", ăn vặt, lượn lờ, nói chung chuyến đi ni siu đáng nhớ 👏',
  },
  "17-2": {
    title: "17/2/2021",
    body: "Chụp ảnh cây Mắt Biếc nè. Chuẩn bị đủ thứ đồ luôn, máy ảnh, chải chuốt làm đẹp các kiểu, hên cái là trời hôm nớ đẹp dã man, nhìn lại vẫn thấy mấy tấm ni ấn tượng nhất trong số ảnh của mình 💖",
  },
  "6-2": {
    title: "6/2/2022",
    body: "Tết là phải tụ tập chớ, tiếc cái là chơi thì nhìu mà ảnh thì ít, tự nhủ mình phải siêng chụp hơn thui 🤲",
  },
  "3-12": {
    title: "3/12/2022",
    body: "Lần đầu biết tới công viên Ánh Sáng, mà xui cái gặp trời mưa. Đang 2 đứa đội quần trốn mưa mà thấy cảnh đẹp cũng đứng lại làm mấy tấm xong chạy tiếp 😆 chiến thiệt",
  },
  "21-1": {
    title: "21/1/2023",
    body: "Lần đầu đón giao thừa cùng nhau 🎆 tuy là cái văn nghệ hôm nớ hong ấn tượng lắm nhưng đc cái ngắm pháo hoa zui, zui hơn nữa khi là ngắm chung vs m 🥰",
  },
  "31-1": {
    title: "31/1/2023",
    body: "Lâu lâu đi cf chụp hình 1 bữa nè. Chụp xấu m giận quá trời lun, nhưng rùi cũng làm lành, cũng zui zẻ lại đc, z mới bền chớ đúng hong 💘",
  },
}
type VideoId = keyof typeof videosMap

function VideoDisplay({
  title,
  body,
  videoLink,
  onContinue,
  onVideoLoaded,
}: {
  videoLink?: string
  onContinue?: () => void
  onVideoLoaded?: () => void
} & Video) {
  const videoElem = useRef<HTMLVideoElement>(null)
  const [isPlaying, setPlaying] = useState<boolean | null>(null)

  useEffect(() => {
    if (isPlaying && videoElem.current?.paused) {
      videoElem.current?.play()
    } else if (isPlaying === false && !videoElem.current?.paused) {
      videoElem.current?.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    videoElem.current?.addEventListener("loadedmetadata", () => {
      onVideoLoaded?.()
    })

    videoElem.current?.addEventListener("play", () => {
      setPlaying(true)
    })

    videoElem.current?.addEventListener("pause", () => {
      setPlaying(false)
    })
  }, [videoLink])

  return (
    <div className="h-full w-full">
      <div className="absolute bottom-0 left-0 z-20 flex w-full flex-col gap-5 bg-gradient-to-t from-slate-900/75 via-slate-900/60 via-70% to-transparent p-5 pt-10">
        <div className="mx-2 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p>{body}</p>
        </div>
        <div className="flex h-[4rem] w-full justify-between">
          {isPlaying === true ? (
            <PauseCircleIcon
              className="h-full hover:cursor-pointer"
              onClick={() => setPlaying(false)}
            />
          ) : (
            <PlayCircleIcon
              className="h-full hover:cursor-pointer"
              onClick={() => setPlaying(true)}
            />
          )}
          <ArrowRightCircleIcon
            onClick={onContinue}
            className="h-full hover:cursor-pointer"
          />
        </div>
      </div>
      <div className="absolute left-0 top-0 z-10 h-[100vh] w-[100vw]">
        {videoLink && (
          <video
            src={videoLink}
            autoPlay={true}
            playsInline={true}
            loop={true}
            ref={videoElem}
            onPlaying={() => setPlaying(true)}
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </div>
  )
}

function DaysQuiz({
  videosMap,
  videoReady,
  onGuessCorrect,
}: {
  videosMap: Record<string, Video>
  videoReady: boolean
  onGuessCorrect: (guess: VideoId) => void
}) {
  const [errorMsg, setErrorMsg] = useState<string | undefined>()
  const [guess, setGuess] = useState<{ day?: number; month?: number }>({})
  const [guessCorrect, setGuessCorrect] = useState(false)
  const [lastFocused, setLastFocused] = useState<"day" | "month">("day")

  const checkGuess = () => {
    if (!guess.day || !guess.month) {
      setErrorMsg("Nhập thíu ngày thíu tháng kìa 😤")
      return
    }

    const guessId = `${guess.day}-${guess.month}`
    if (videosMap[guessId]) {
      setGuessCorrect(true)
      onGuessCorrect(guessId as VideoId)
    } else {
      setErrorMsg("Sai rồi, hong chơi đoán mò nha ⛔")
    }
  }

  const addNumber = (number: number) => {
    if (lastFocused === "day") {
      guess.day = (guess.day ?? 0) * 10 + number
    } else {
      guess.month = (guess.month ?? 0) * 10 + number
    }
    setGuess({ ...guess })
  }

  const removeNumber = () => {
    if (lastFocused === "day") {
      guess.day = Math.floor((guess.day ?? 0) / 10) || undefined
    } else {
      guess.month = Math.floor((guess.month ?? 0) / 10) || undefined
    }
    setGuess({ ...guess })
  }

  useEffect(() => {
    if (videoReady) {
      setGuess({})
      setErrorMsg(undefined)
      setGuessCorrect(false)
    }
  }, [videoReady])

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5">
      <h1 className="mb-5 text-center text-5xl font-bold">Days Quiz</h1>
      <div className="grid auto-rows-auto grid-cols-2 gap-x-3 text-center">
        <div
          className={`quiz-number ${
            lastFocused === "day" ? "bg-white/50" : "bg-transparent"
          }`}
          onClick={() => setLastFocused("day")}
        >
          <span>{guess.day ?? ""}</span>
        </div>
        <div
          className={`quiz-number ${
            lastFocused === "month" ? "bg-white/50" : "bg-transparent"
          }`}
          onClick={() => setLastFocused("month")}
        >
          <span>{guess.month ?? ""}</span>
        </div>
        <span className="text-lg">Ngày</span>
        <span className="text-lg">Tháng</span>
      </div>
      <div className="grid grid-cols-3 grid-rows-4 gap-2">
        {Array.from({ length: 9 }).map((_, i) => (
          <button className="numpad-number" onClick={() => addNumber(i + 1)}>
            <span>{i + 1}</span>
          </button>
        ))}
        <button className="numpad-number" onClick={removeNumber}>
          <BackspaceIcon className="w-8" />
        </button>
        <button className="numpad-number" onClick={() => addNumber(0)}>
          <span>0</span>
        </button>
        <button className="numpad-number" onClick={checkGuess}>
          {guessCorrect && !videoReady ? (
            <ArrowPathIcon className="w-8 animate-spin" />
          ) : (
            <OutlinedArrowRightIcon className="w-8" />
          )}
        </button>
      </div>
      <span className="h-1 text-white/75">
        {errorMsg ?? "Nhập ngày nhập tháng bấm ➡️ nha."}
      </span>
    </div>
  )
}

function App() {
  const [currentVideoId, setCurrentVideoId] = useState<VideoId | undefined>()
  const [currentVideo, setCurrentVideo] = useState<Video | undefined>()
  const [videoReady, setVideoReady] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const handle = useFullScreenHandle()

  useEffect(() => {
    if (currentVideoId) {
      setCurrentVideo(videosMap[currentVideoId])
    } else {
      setCurrentVideo(undefined)
    }
  }, [currentVideoId])

  useEffect(() => {
    setShowVideo(currentVideo !== undefined && videoReady)
  }, [currentVideo, videoReady])

  return (
    <FullScreen
      className="brightness-70 saturate-2 h-[100vh] w-[100vw] overflow-hidden bg-gradient-to-b from-blue-500 to-purple-500 text-white"
      handle={handle}
    >
      <div className={`h-full w-full ${showVideo ? "" : "hidden"}`}>
        <VideoDisplay
          title={currentVideo?.title ?? ""}
          body={currentVideo?.body ?? ""}
          videoLink={currentVideo ? `/videos/${currentVideoId}.mp4` : undefined}
          onContinue={() => {
            setCurrentVideoId(undefined)
            setVideoReady(false)
          }}
          onVideoLoaded={() => setVideoReady(true)}
        />
      </div>
      <div className={`h-full w-full ${!showVideo ? "" : "hidden"}`}>
        <DaysQuiz
          videosMap={videosMap}
          videoReady={videoReady}
          onGuessCorrect={(guess) => setCurrentVideoId(guess)}
        />
      </div>

      {!showVideo && (
        <div className="absolute bottom-0 my-3 flex w-full justify-center">
          <button
            onClick={handle.active ? handle.exit : handle.enter}
            className="rounded-lg bg-white/50 p-2 hover:cursor-pointer"
          >
            {handle.active ? (
              <ArrowsPointingInIcon className="w-6" />
            ) : (
              <ArrowsPointingOutIcon className="w-6" />
            )}
          </button>
        </div>
      )}
    </FullScreen>
  )
}

export default App
