$(document).ready(function() {
  // 전체 동의 체크박스 클릭 시 나머지 체크박스 모두 체크 또는 해제
  $('#checkAll').on('change', function() {
    var isChecked = $(this).is(':checked');
    $('.drjoin-checkboxInput').not('#checkAll').prop('checked', isChecked);
  });

  // 개별 체크박스 상태 변경 시 전체 동의 체크박스 상태도 변경
  $('.drjoin-checkboxInput').not('#checkAll').on('change', function() {
    var allChecked = $('.drjoin-checkboxInput').not('#checkAll').length === $('.drjoin-checkboxInput:checked').not('#checkAll').length;
    $('#checkAll').prop('checked', allChecked);
  });

  // 아이디 정규표현식: 이메일 형식 검사
  const userIdRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // 아이디(이메일) blur 시 정규표현식 검사
  $('#userId').on("blur", function() {
    const userIdValue = $(this).val();
    if (!userIdRegex.test(userIdValue)) {
      $("#userIdError").text("형식에 맞게 입력해주세요.")
                       .css({"color": "red", "display": "block"});
    } else {
      $("#userIdError").text("").hide();
      $(this).css("border", "");
    }
  });

  // 비밀번호 유효성 검사
  $('#password').on('input', function() {
    const passwordValue = $(this).val().trim();
    if (passwordValue.length < 6) {
      $("#passwordError").text("비밀번호는 최소 6자리 이상이어야 합니다.").css('color', 'red');
    } else {
      $("#passwordError").text("").hide();
    }
  });

  // 비밀번호 확인 유효성 검사 (실시간)
  $('#confirmPassword').on('input', function() {
    const passwordValue = $("#password").val().trim();
    const confirmPasswordValue = $(this).val().trim();
    
    if (passwordValue !== confirmPasswordValue) {
      $("#confirmPasswordError").text("비밀번호가 일치하지 않습니다.").css('color', 'red');
    } else {
      $("#confirmPasswordError").text("").hide();
    }
  });

  // 휴대폰 번호 유효성 검사 정규표현식 (하이픈 없이 숫자만 10~11자리)
  const phonePattern = /^[0-9]{10,11}$/;

  // 휴대폰 번호 입력 필드에 대한 blur 이벤트
  $('#phone').on('blur', function () {
    const phone = $(this).val().trim();
    if (!phone) {
      $('#phoneError').text("휴대폰 번호를 입력하세요.").css('color', 'red');
      return;
    }
    if (!phonePattern.test(phone)) {
      $('#phoneError').text("형식에 맞게 입력하세요.").css('color', 'red');
    } else {
      $('#phoneError').text("");
    }
  });

  // 인증요청 버튼 클릭 시 이벤트 처리
  $('#sendCode').on('click', function () {
    const phone = $('#phone').val().trim();
    if (!phonePattern.test(phone)) {
      $('#phoneError').text("형식에 맞는 휴대폰 번호를 입력하세요.").css('color', 'red');
      return;
    }
    alert("인증이 요청되었습니다");
  });

  // 회원가입 버튼 클릭 이벤트
  $('.drjoin-finishButton').on('click', function (event) {
    event.preventDefault(); // 폼 제출 방지

    // 유효성 검사 플래그
    let isValid = true;

    // 아이디(이메일) 유효성 검사
    const userIdValue = $("#userId").val();
    if (!userIdRegex.test(userIdValue)) {
      isValid = false;
    }

    // 비밀번호 유효성 검사
    const passwordValue = $("#password").val().trim();
    if (passwordValue.length < 6) {
      isValid = false;
    }

    // 비밀번호 확인 유효성 검사
    const confirmPasswordValue = $("#confirmPassword").val().trim();
    if (passwordValue !== confirmPasswordValue) {
      isValid = false;
    }

    // 이름 유효성 검사
    const nameValue = $("#name").val().trim();
    if (nameValue === "") {
      isValid = false;
    }

    // 휴대폰 번호 유효성 검사
    const phoneValue = $("#phone").val().trim();
    if (!phonePattern.test(phoneValue)) {
      isValid = false;
    }

    // 인증번호 유효성 검사
    const authCodeValue = $("#authCode").val().trim();
    if (authCodeValue === "") {
      isValid = false;
    }

    // 약관 동의 체크 유효성 검사
    if (!$('#checkAge').is(':checked') || !$('#checkTerms').is(':checked') || !$('#checkPrivacy').is(':checked')) {
      isValid = false;
    }

    // 유효성 검사를 통과했는지 확인
    if (isValid) {
      alert("회원가입이 완료되었습니다.");
      // 추가 작업 (예: 폼 제출)
      // $('#drjoinForm').submit(); // 필요에 따라 주석 해제
    } else {
      alert("형식에 맞지 않습니다. 다시 입력해주세요.");
    }
  });
});

// 비밀번호 토글 기능 추가
document.getElementById('passwordToggle').addEventListener('click', function () {
  const passwordInput = document.getElementById('password');
  const passwordToggleIcon = document.getElementById('passwordToggle');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text'; // 비밀번호 보이기
    passwordToggleIcon.src = '/image/view.png'; // 아이콘 변경
  } else {
    passwordInput.type = 'password'; // 비밀번호 숨기기
    passwordToggleIcon.src = '/image/noview.png'; // 아이콘 변경
  }
});

document.getElementById('confirmPasswordToggle').addEventListener('click', function () {
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const confirmPasswordToggleIcon = document.getElementById('confirmPasswordToggle');

  if (confirmPasswordInput.type === 'password') {
    confirmPasswordInput.type = 'text'; // 비밀번호 보이기
    confirmPasswordToggleIcon.src = '/image/view.png'; // 아이콘 변경
  } else {
    confirmPasswordInput.type = 'password'; // 비밀번호 숨기기
    confirmPasswordToggleIcon.src = '/image/noview.png'; // 아이콘 변경
  }
});
