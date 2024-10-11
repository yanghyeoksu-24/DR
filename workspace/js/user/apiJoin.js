$(document).ready(function() {
  // 전체 동의 체크박스 클릭 시 나머지 체크박스 모두 체크 또는 해제
  $('#checkAll').on('change', function() {
    var isChecked = $(this).is(':checked');
    $('.apijoin-checkboxInput').not('#checkAll').prop('checked', isChecked);
  });

  // 개별 체크박스 상태 변경 시 전체 동의 체크박스 상태도 변경
  $('.apijoin-checkboxInput').not('#checkAll').on('change', function() {
    var allChecked = $('.apijoin-checkboxInput').not('#checkAll').length === $('.apijoin-checkboxInput:checked').not('#checkAll').length;
    $('#checkAll').prop('checked', allChecked);
  });
});

$(document).ready(function() {
  const userIdInput = $("#userId");
  const userIdError = $("#userIdError");

  // 아이디 정규표현식: 이메일 형식 검사
  const userIdRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;



  // blur 시 정규표현식 검사
  userIdInput.on("blur", function() {
    const userIdValue = $(this).val();

    if (!userIdRegex.test(userIdValue)) {
      userIdError.text("형식에 맞게 입력해주세요.")
                 .css({"color": "red", "display": "block"});  // 에러 메시지 표시
      
    } else {
      userIdError.text("").hide();  // 에러 메시지 숨김
      $(this).css("border", "");
    }
  });
});

$(document).ready(function () {
  // 휴대폰 번호 유효성 검사 정규표현식 (하이픈 없이 숫자만 10~11자리)
  const phonePattern = /^[0-9]{10,11}$/;

  // 휴대폰 번호 입력 필드에 대한 blur 이벤트
  $('#phone').on('blur', function () {
      const phone = $(this).val().trim(); // 입력된 휴대폰 번호 값 가져오기

      // 입력된 휴대폰 번호가 비어 있는 경우
      if (!phone) {
          $('#phoneError').text("휴대폰 번호를 입력하세요.").css('color', 'red');
          return;
      }

      // 휴대폰 번호 유효성 검사
      if (!phonePattern.test(phone)) {
          $('#phoneError').text("형식에 맞게 입력하세요.").css('color', 'red');
      } else {
          $('#phoneError').text(""); // 올바른 형식일 경우 오류 메시지 제거
      }
  });

  // 인증요청 버튼 클릭 시 이벤트 처리
  $('#sendCode').on('click', function () {
      const phone = $('#phone').val().trim(); // 입력된 휴대폰 번호 값 가져오기

      // 휴대폰 번호가 비어 있거나 형식이 맞지 않을 경우
      if (!phonePattern.test(phone)) {
          $('#phoneError').text("형식에 맞는 휴대폰 번호를 입력하세요.").css('color', 'red');
          return;
      }

      // 형식이 맞으면 alert 창을 띄움
      alert("인증이 요청되었습니다");
  });
});

$(document).ready(function () {
  // 유효성 검사 정규 표현식
  const userIdRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phonePattern = /^[0-9]{10,11}$/;

  // 회원가입 버튼 클릭 이벤트
  $('.apijoin-finishButton').on('click', function (event) {
      event.preventDefault(); // 폼 제출 방지

      // 유효성 검사 플래그
      let isValid = true;

      // 아이디(이메일) 유효성 검사
      const userIdValue = $("#userId").val();
      if (!userIdRegex.test(userIdValue)) {
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
          // $('#apijoinForm').submit(); // 필요에 따라 주석 해제
      } else {
          alert("형식에 맞지 않습니다. 다시 입력해주세요.");
      }
  });
});









