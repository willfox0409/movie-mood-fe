export default function AboutPage() {
  return (
    <section
      className="
        min-h-screen px-6 py-10
        text-white bg-gray-900
        flex flex-col items-center
      "
      aria-labelledby="about-title"
    >
      {/* Hero image */}
      <div className="w-full max-w-3xl">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
          <img
            src="/images/concessions.jpg"
            alt="Movie theater concessions stand"
            className="w-full h-64 sm:h-80 object-cover transition duration-500 group-hover:brightness-125 group-hover:saturate-150 group-hover:shadow-[0_0_20px_#ff00ff]"
            loading="lazy"
          />
          {/* top-to-bottom gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60 pointer-events-none" />
        </div>
      </div>

      {/* Copy block */}
      <div className="w-full max-w-3xl mt-8 space-y-4 font-mono leading-relaxed text-lg">
        <p>
          Hi, I’m Will Fox, and I came up with Movie Mood after spending an hour
          bouncing between five different streaming platforms, seeing hundreds of
          movies, and ending up watching the first five minutes of <em>The Fellowship of the Ring </em>
          before calling it a night. When I realized I wasn’t alone in this madness, I decided to build a
          tool to cut through the decision fatigue, and make picking a movie fun again.
        </p>
        <p>
          I’m a 90s kid, so I remember when movie night meant driving to the video store,
          wandering the aisles, judging movies entirely by the cover art, and maybe asking
          the person behind the counter for their weirdly passionate recommendation.
          Even if you ended up with a dud, you made a night of it. Now? You open a
          streaming app and get buried in endless “Top Picks” until you’re too tired to
          start anything.
        </p>
        <p>
          Movie Mood is my attempt to bring back a little of that guided, human feel.
          You pick your mood, maybe set a few other filters, and the app serves up three
          tailored recommendations, one at a time, so you can focus on watching instead
          of scrolling.
        </p>
        <p>
          Under the hood, it uses the TMDB API for movie data, OpenAI for the recommendations,
          and JustWatch for where-to-watch info. Built with Ruby on Rails, PostgreSQL,
          JavaScript, React, and Tailwind CSS.
        </p>
        <p>
          Special thanks to the Turing School of Software & Design for teaching me that
          programming can be as creative as making music.
        </p>
        <p>
          Contact: If you have any suggestions for the UX flow, feel free to send me an
          email at <a href="mailto:willfoxband@gmail.com" className="underline">willfoxband@gmail.com</a>,
          or if you can think of a better “Mood” than <em>'Never Trust the Gas Station Attendant'</em>,
          I’m all ears!
        </p>
      </div>
    </section>
  );
}