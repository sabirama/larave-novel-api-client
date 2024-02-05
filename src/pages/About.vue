<template>
  <main class="about">
    <aside class="breadcrumb">
    <div>
      <router-link to="/">home /</router-link><router-link to="/about" class="active">about</router-link>
    </div>
  </aside>
    <article>
        <h1>ABOUT</h1>
      <div class="overview">
        <h3>Overview:</h3>
        <p>
            Light Novel Corner is a comprehensive and user-friendly online platform
            dedicated to the world of novels and literature. Designed for avid
            readers, book enthusiasts, and anyone looking to explore the vast realm
            of fictional narratives, our website is a go-to destination for
            discovering, discussing, and immersing oneself in the captivating
            universe of novels.
        </p>
        <p>
        At Light Novel Corner, we are passionate about bringing you the latest
        and most comprehensive information about light novels. Our dedicated
        team of enthusiasts and experts curates a diverse collection of reviews,
        recommendations, and insightful analyses to help you discover your next
        favorite series. From heartwarming romances and thrilling adventures to
        epic fantasy worlds and slice-of-life tales, we strive to showcase the
        rich tapestry of narratives that light novels have to offer.
      </p>
      </div>

      <div class="features">
        <h3>Features:</h3>
            <h4>Reviews and Ratings:</h4>
            <p>
                Make informed decisions about your next read by checking out
                user-generated reviews and ratings. Share your own opinions and
                contribute to a vibrant community of readers who appreciate the value of
                thoughtful discussions about novels.
            </p>
            <h4>Latest Releases and News:</h4>
            <p>
                Stay up-to-date with the latest releases, literary news, and author
                announcements. NovelDiscover.com keeps you in the loop with the
                ever-evolving landscape of the literary world.
            </p>
      </div>

      <div class="closing">
        <p>
        Embark on a journey of literary exploration with Light Novel Corner,
        where the love for novels knows no bounds. Whether you're a seasoned
        reader or just beginning your literary adventure, our platform is your
        gateway to a world of captivating stories and endless possibilities.
      </p>
      </div>
    </article>
    <button class="to-top" @click="toTop">Back to Top</button>
  </main>
</template>

<script setup></script>

<style scoped>
@import url(./css/Main.css);
@import url(./css/About.css);
@import url(./css/Breadcrumb.css);
</style>
