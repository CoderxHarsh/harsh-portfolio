$(function () {
  $(".nav-toggle").on("click", function () {
    const open = $(".nav-links").toggleClass("open").hasClass("open");
    $(this).attr("aria-expanded", open);
  });

  const savedTheme = localStorage.getItem("harsh-theme");
  if (savedTheme === "dark") $("html").attr("data-theme", "dark");

  $(".theme-toggle").on("click", function () {
    const dark = $("html").attr("data-theme") === "dark";
    $("html").toggleClass("theme-transition");
    if (dark) {
      $("html").removeAttr("data-theme");
      localStorage.setItem("harsh-theme", "light");
    } else {
      $("html").attr("data-theme", "dark");
      localStorage.setItem("harsh-theme", "dark");
    }
  });

  $(".print-btn").on("click", () => window.print());

  $(".filter-btn").on("click", function () {
    const filter = $(this).data("filter");
    $(".filter-btn").removeClass("active");
    $(this).addClass("active");
    $(".project-card").each(function () {
      const category = String($(this).data("category"));
      const show = filter === "all" || category.includes(filter);
      if (show) $(this).stop(true, true).fadeIn(180);
      else $(this).stop(true, true).fadeOut(120);
    });
  });

  $("#contactForm").on("submit", function (e) {
    e.preventDefault();
    $(".field-error").text("");
    $(".form-success").hide();

    const name = $.trim($("#name").val());
    const email = $.trim($("#email").val());
    const message = $.trim($("#message").val());
    let valid = true;

    if (name.length < 2) {
      $("#name").siblings(".field-error").text("Please enter your name.");
      valid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      $("#email").siblings(".field-error").text("Please enter a valid email.");
      valid = false;
    }
    if (message.length < 10) {
      $("#message").siblings(".field-error").text("Message should be at least 10 characters.");
      valid = false;
    }

    if (valid) {
      $(".form-success").stop(true, true).fadeIn(220);
      this.reset();
    }
  });

  const revealTargets = $(".feature-card, .project-card, .panel, .cta-panel");
  revealTargets.css({opacity: 0, transform: "translateY(14px)"});

  function reveal() {
    const trigger = $(window).scrollTop() + $(window).height() - 55;
    revealTargets.each(function () {
      if ($(this).offset().top < trigger) {
        $(this).stop(true).animate({opacity: 1}, 380);
        $(this).css("transform", "translateY(0)");
      }
    });
  }
  reveal();
  $(window).on("scroll", reveal);
});
