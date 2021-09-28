<script>
  // libraries
  import { fade } from 'svelte/transition'
  import { sineInOut } from 'svelte/easing'
  import { onMount } from "svelte"
  import { create_in_transition } from 'svelte/internal'

  // components
  import IntersectionObserver from "./components/IntersectionObserver.svelte"

  // props
  export let certificates
  export let projects
  export let pageSections
  export let mediaLinks
  export let builtByMe

  let certificateName, certificateYear, certificateLink
  let lazy = false
  let i = 1

  onMount(() => {
    window.scrollTo({
      top: 0
    })

    setInterval(() => {
      if ( !(certificateName && certificateLink && certificateYear) ) return

      certificateName.innerText = certificates[i][0]
      certificateYear.innerText = certificates[i][1]
      certificateLink.href = certificates[i][2]

      create_in_transition(certificateName, fade, { duration: 1000 }).start()
      create_in_transition(certificateYear, fade, { duration: 1000 }).start()

      i = i === certificates.length - 1 ? 0 : i + 1
    }, 2500)

    lazy = true
  })

  // helper
  function slugify(str) {
    return str
      .toLowerCase()
      .replace(/[ _/]/g, '-')
  }

  // animations
  function appear(node, { duration, delay = 0 }) {
		return {
			duration,
      delay,
			css: t => {
				const eased = sineInOut(t);

				return `
					transform: translateY(${1 - eased}em);
					opacity: ${eased}
        `
			}
		};
	}
</script>

<main class="overflow-x-hidden">
  <nav
    class="
    bg-white w-screen fixed h-[4em] shadow-md
      flex items-center px-5 md:px-16 z-50
    "
  >
    <a
      class="h-full py-3"
      href="/"
    >
      <img
        class="
          h-full object-contain
        "
        src="/assets/icon.svg"
        alt=""
      />
    </a>
    <div class="ml-auto">
      {#each pageSections as section}
        <a
          class="
            text-base font-bold text-sm md:text-md mx-1 md:mx-2 py-1
            hover:border-b-4 border-base transition
          "
          href={'#' + slugify(section)}
        >
          {section}
        </a>
      {/each}
    </div>
  </nav>

  <!-- Entry Section -->
  <IntersectionObserver let:intersecting once={true}>
    <article class="w-screen h-screen flex flex-col justify-center items-center px-5">
        {#if intersecting}
          <h1
            class="
              text-[10vw] md:text-[5em] text-center md:w-[55vw] font-extrabold
              leading-[1.1em] drop-shadow-sm text-heading
              moving
            "
            in:appear={{duration: 1000, delay: 300}}
          >
            Build Application That Useful For Anyone
          </h1>
          <div class="w-screen h-screen flex flex-col-reverse absolute top-0 z-[-1]">
            <img class="w-screen h-[35vh]" src="/assets/wave.png" alt="" in:appear={{duration: 500}}/>
          </div>
        {/if}
      </article>
  </IntersectionObserver>

  <!-- About Me Section -->
  <IntersectionObserver let:intersecting once={true}>
    <h3 id="about" class="opacity-0">About Me</h3>
    <div class="w-screen py-14">
      {#if intersecting}
      
      <article class="md:w-[80%] border-l-8 border-muted px-14 mx-auto">
          <svg
            class="
              hidden lg:block absolute z-[-1] right-0 moving
            "
            in:appear={{duration: 500, delay: 500}}
            width="459" height="109" viewBox="0 0 459 109" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M480 31.4235C432.974 12.8053 302.77 -8.07378 158.164 57.3561C13.5586 122.786 -2.60664 47.7145 7.38643 2" stroke="#FF505A" stroke-width="10"/>
            <path d="M500 51.4235C454.162 32.8053 327.247 11.9262 186.295 77.3561C45.3424 142.786 29.5855 67.7145 39.3261 22" stroke="#C62368" stroke-width="10"/>
          </svg>
          <h2
            class="
              text-[8vw] md:text-[3em] lg:text-[4em] mb-9
              text-accent font-bold
            "
            in:appear={{duration: 1000, delay: 500}}
          >Who Am I<span class="text-muted">?</span></h2>

          <p
            class="
              text-md md:text-[1.5em] text-base lg:w-[70%] leading-[1.7em]
            "
            in:appear={{duration: 1200, delay: 800}}
          >
            My name is Fazle and I am a developer also a student from Indonesia,
            I love building application especially a web application,
            I love to build application that useful for anyone and has simple
            user interface that create amazing user experience.
            I build my applications with some languages
            like <strong>Javascript, Typescript, CSS, HTML</strong>, and
            sometimes using frameworks like <strong>React, Svelte, and Tailwind</strong>.
          </p>
        </article>

      {/if}
    </div>
  </IntersectionObserver>


  <!-- Certificates Section -->
  <IntersectionObserver let:intersecting once={true}>
    <div class="w-screen h-36 flex flex-col justify-center items-center">
      {#if intersecting}
        <a class="w-[80%]" href={certificates[0][2]} target="_blank" rel="noopener" bind:this={certificateLink}>
          <div
            class="
              bg-gradient-to-br from-accent to-secondary rounded-3xl
              flex flex-col items-center justify-center p-5
            "
            in:appear={{duration: 1000}}
          >
            <h2 class="mb-2 text-primary">Certificates</h2>
            <p
              class="text-primary font-bold text-center"
              bind:this={certificateName}>
                {certificates[0][0]}
            </p>
            <p
              class="text-primary text-center"
              bind:this={certificateYear}>
                {certificates[0][1]}
            </p>
          </div>
        </a>
      {/if}
    </div>
  </IntersectionObserver>

  <!-- Projects section -->
  <IntersectionObserver let:intersecting once={true}>
    <article class="w-screen px-10 py-20 border-b-2 border-secondary">
        <h3 id="projects" class="opacity-0">My Projects</h3>       
        {#if intersecting}
          <h2
            class="
              text-center md:text-left text-[8vw] md:text-[3em] lg:text-[4em]
              text-accent font-bold md:ml-20
            "
            
            in:appear={{duration: 1000}}
          >
            My <span class="text-muted">&lt;</span>Projects<span class="text-muted">/&gt;</span>
          </h2>

          <div class="
            md:ml-20 w-full md:w-[80%] flex justify-center md:block
          "
            in:appear={{duration: 1000, delay: 500}}
          >
            {#each builtByMe as project}
              <a href={project[2]}>
                <img
                  class="
                    w-14 filter grayscale hover:grayscale-0 transition
                  "
                  src={project[1]}
                  title={project[0]}
                  alt={project[0]}
                >
              </a>
            {/each}
          </div>

          <div class="py-5 flex flex-wrap justify-center md:justify-start mt-9">
            {#if lazy}
              {#each projects as project}
                <a class="text-muted m-2" href={project[1]} target="_blank" rel="noopener">
                  <img
                    loading="lazy"
                    class="
                      w-80 h-52 m-1 object-cover border-4 rounded-md
                      border-muted shadow-lg hover:border-accent transition
                    "
                    src={project[2]}
                    title={project[0]}
                    alt="">
                  {project[0]}
                </a>
              {/each}
            {/if}
          </div>
        {/if}
      </article>
  </IntersectionObserver>

  <!-- Social Media Section -->
  <IntersectionObserver let:intersecting once={true}>
    <div class="w-screen h-screen flex flex-col justify-center items-center px-5">
        <svg class="absolute md:left-28 z-[-1] moving" width="606" height="565" viewBox="0 0 606 565" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M520.75 46.2501C576.312 90.0001 607.812 163.5 605.187 230.438C602.562 297.375 565.812 357.75 532.125 405.875C498.437 454.438 467.812 490.313 430.625 517.875C393.437 545.438 349.25 564.25 305.062 564.688C260.875 565.125 216.687 547.188 178.625 520.063C140.562 492.5 109.062 456.188 70.9998 405.875C32.9373 355.563 -11.2502 291.688 2.74985 246.625C16.7498 201.563 89.8123 175.313 150.187 133.313C210.562 90.8751 257.812 33.1251 321.687 10.8126C385.125 -11.0624 464.75 2.50011 520.75 46.2501Z" fill="#FF505A"/>
        </svg>
        <h3 class="opacity-0" id="find-me">Let's Find Me</h3>
        {#if intersecting}
          <h1
            
            class="
              text-[10vw] md:text-[5em] text-center font-extrabold
              leading-[1.1em] drop-shadow-sm text-heading mb-5
            "
            in:appear={{duration: 1000}}
          >Find Me On</h1>
          <div class="flex flex-wrap justify-center" >
            {#each mediaLinks as link}
              <a
                class="
                  text-heading font-bold text-lg mx-2 md:mx-5 py-1
                  hover:border-b-4 border-heading transition
                "
                in:fade
                href={link[1]}
                target="_blank"
                rel="noopener"
              >
                { link[0] }
              </a>
            {/each}
          </div>
        {/if}
      </div>
  </IntersectionObserver>
</main>

<style global lang="postcss">
  @import url('https://fonts.googleapis.com/css2?family=Overpass:wght@400;700;800&display=swap');

  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer base {
    :root {
      --heading-color: #332021;
      --text-color: #584142;
      --accent-color: #FF505A;
      --primary-color: #FFFFFF;
      --secondary-color: #C62368;
      --muted-color: #A3A3A3;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Overpass', sans-serif;
      scroll-behavior: smooth;
    }

    body::-webkit-scrollbar {
      width: 1em;
    }

    body::-webkit-scrollbar-thumb {
      background: var(--accent-color);
    }
  }

  .moving {
    animation: infinite 2s moving ease-in-out;
  }

  @keyframes moving {
    0% {
      transform: translateY(0);
    }
    
    50% {
      transform: translateY(0.5em);
    }
    
    100% {
      transform: translateY(0);
    }
  }
</style>