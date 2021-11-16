import sublinks from './data.js'

const toggleBtn = document.querySelector('.toggle-btn')
const closeBtn = document.querySelector('.close-btn')
const sidebarWrapper = document.querySelector('.sidebar-wrapper')
const sidebarLinks = document.querySelector('.sidebar-links')
const linkBtn = [...document.querySelectorAll('.link-btn')]
const submenu = document.querySelector('.submenu')
const hero = document.querySelector('.hero')
const nav = document.querySelector('.nav')

// hide/show sidebar
toggleBtn.addEventListener('click', () => {
  sidebarWrapper.classList.add('show')
})

closeBtn.addEventListener('click', () => {
  sidebarWrapper.classList.remove('show')
})

// set sidebar
sidebarLinks.innerHTML = sublinks.map((item) => {
  // console.log(item);
  const {links, page} = item
  return `<article>
  <h4>${page}</h4>
  <div class="sidebar-sublinks">
  ${links
    .map((item) => {
      const {url, icon, label} = item
      return `<a href="${url}"><i class="${icon}"></i>${label}</a>`
    })
    .join('')}
  </div>
  </article>`
}).join('')

linkBtn.forEach((btn) => {
  btn.addEventListener('mouseover', function (e) {
    const text = e.currentTarget.textContent

    // get the coordinates of the buttons with getBoundingClientRect
    const tempBtn = e.currentTarget.getBoundingClientRect()
    submenu.classList.add('show')

    // get the submenu to appear underneath the buttons
    const center = (tempBtn.left + tempBtn.right) / 2
    const bottom = tempBtn.bottom - 3
    // overriding the default css style
    submenu.style.left = `${center}px` 
    submenu.style.top = `${bottom}px`

    const tempPage = sublinks.find((item) => {
      const {page} = item
      return page === text
    })
    if (tempPage) {
      const {page, links} = tempPage
      submenu.innerHTML = `
      <section>
      <h4>${page}</h4>
      <div class="submenu-center">
      ${links.map((item) => {
        const {url, icon, label} = item
        return `<a href="${url}"><i class="${icon}"></i>${label}</a>`
      }).join('')}
      </div>
      </section>
      `
    }
  })
})

hero.addEventListener('mouseover', () => {
  submenu.classList.remove('show')
})

nav.addEventListener('mouseover', (e) => {
  if (!e.target.classList.contains('link-btn')) {
    submenu.classList.remove('show')
  }
})