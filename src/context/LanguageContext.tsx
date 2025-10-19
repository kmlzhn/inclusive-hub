"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ru' | 'kk';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Словари переводов
const translations = {
  ru: {
    // Навигация
    'nav.dashboard': 'Панель управления',
    'nav.back_to_dashboard': 'Назад к панели управления',
    'nav.logout': 'Выйти',
    'nav.loading': 'Загрузка...',
    
    // Общие
    'common.loading': 'Загрузка...',
    'common.save': 'Сохранить',
    'common.cancel': 'Отмена',
    'common.edit': 'Редактировать',
    'common.delete': 'Удалить',
    'common.add': 'Добавить',
    'common.search': 'Поиск',
    'common.filter': 'Фильтр',
    'common.yes': 'Да',
    'common.no': 'Нет',
    'common.close': 'Закрыть',
    'common.back': 'Назад',
    'common.next': 'Далее',
    'common.previous': 'Предыдущий',
    'common.details': 'Подробнее',
    
    // Роли пользователей
    'role.admin': 'Администратор',
    'role.teacher': 'Учитель',
    'role.psychologist': 'Психолог',
    'role.defectologist': 'Дефектолог',
    'role.speech_therapist': 'Логопед',
    'role.tutor': 'Тьютор',
    'role.user': 'Пользователь',
    
    // Dashboard - модули для администратора
    'dashboard.admin.user_management': 'Управление пользователями',
    'dashboard.admin.user_management_desc': 'Добавление и редактирование учетных записей',
    'dashboard.admin.reports': 'Статистика и отчеты',
    'dashboard.admin.reports_desc': 'Общая статистика по школе',
    'dashboard.admin.resources': 'Распределение ресурсов',
    'dashboard.admin.resources_desc': 'Управление ресурсами школы',
    
    // Dashboard - модули для учителя
    'dashboard.teacher.students': 'Мои ученики',
    'dashboard.teacher.students_desc': 'Список учеников с особыми потребностями',
    'dashboard.teacher.assignments': 'Задания',
    'dashboard.teacher.assignments_desc': 'Создание и проверка заданий',
    'dashboard.teacher.attendance': 'Посещаемость',
    'dashboard.teacher.attendance_desc': 'Отметка посещаемости',
    'dashboard.teacher.training': 'Обучение',
    'dashboard.teacher.training_desc': 'Тренинги и консультации для учителей',
    
    // Dashboard - модули для специалистов
    'dashboard.specialist.students': 'Мои ученики',
    'dashboard.specialist.students_desc': 'Список учеников с особыми потребностями',
    'dashboard.specialist.iop': 'Индивидуальные планы',
    'dashboard.specialist.iop_desc': 'Индивидуальные образовательные планы',
    'dashboard.specialist.consultations': 'Консультации',
    'dashboard.specialist.consultations_desc': 'Расписание и записи консультаций',
    'dashboard.specialist.reports': 'Отчеты',
    'dashboard.specialist.reports_desc': 'Отчеты о проделанной работе',
    'dashboard.specialist.training': 'Тренинги',
    'dashboard.specialist.training_desc_psychologist': 'Материалы по психологической поддержке',
    'dashboard.specialist.training_desc_defectologist': 'Материалы по коррекционной педагогике',
    'dashboard.specialist.training_desc_speech': 'Материалы по логопедической работе',
    'dashboard.specialist.training_desc_tutor': 'Материалы по тьюторскому сопровождению',
    
    // Заголовки страниц
    'page.dashboard.title': 'Панель управления',
    'page.dashboard.welcome': 'Добро пожаловать',
    'page.dashboard.role': 'Ваша роль',
    'page.dashboard.modules': 'Доступные модули',
    'page.dashboard.user_info': 'Информация о пользователе',
    'page.dashboard.user_name': 'ФИО',
    'page.dashboard.user_email': 'Email',
    'page.dashboard.user_role': 'Роль',
    'page.dashboard.common_resources': 'Общие ресурсы',
    'page.dashboard.role_modules': 'Модули для вашей роли',
    'page.dashboard.ai_chatbot': 'AI Чат-бот по инклюзии',
    'page.dashboard.ai_chatbot_desc': 'Получите помощь по вопросам инклюзивного образования',
    'page.dashboard.open_chat': 'Открыть чат-бот →',
    'common.open': 'Открыть',
    'page.dashboard.normative_acts.title': 'Нормативные акты',
    'page.dashboard.normative_acts.description': 'Законы и правовые документы по инклюзии',
    'page.dashboard.normative_acts.open': 'Открыть документы →',
    
    // Аутентификация
    'auth.login.title': 'Вход в систему',
    'auth.login.email': 'Email',
    'auth.login.password': 'Пароль',
    'auth.login.submit': 'Войти',
    'auth.login.submitting': 'Вход...',
    'auth.login.error': 'Произошла ошибка при входе. Пожалуйста, попробуйте снова.',
    'auth.login.email_placeholder': 'example@school.ru',
    'auth.platform_description': 'Платформа для инклюзивного образования',
    
    // Страница нормативных актов
    'legal.title': 'Нормативные акты',
    'legal.main_title': 'Нормативные акты по инклюзивному образованию',
    'legal.description': 'Правовая база и законодательные акты Республики Казахстан в сфере инклюзивного образования и социальной защиты лиц с инвалидностью',
    'legal.info_system.title': 'Информационно-правовая система',
    'legal.info_system.description': 'Институт законодательства и правовой информации Министерства юстиции Республики Казахстан',
    'legal.document_content': 'Содержание документа:',
    'legal.additional_resources': 'Дополнительные ресурсы',
    'legal.useful_links': 'Полезные ссылки',
    'legal.contact_info': 'Контактная информация',
    'legal.phone': 'Телефон:',
    'legal.email': 'Email:',
    'legal.working_hours': 'Время работы:',
    
    // Типы документов
    'legal.document_type.government_decree': 'Постановление Правительства',
    'legal.document_type.law_rk': 'Закон РК',
    'legal.document_type.code_rk': 'Кодекс РК',
    'legal.document_type.international_treaty': 'Международный договор',
    
    // Управление пользователями
    'users.title': 'Управление пользователями',
    'users.add_user': 'Добавить пользователя',
    'users.edit_user': 'Редактировать пользователя',
    'users.create_user': 'Добавить пользователя',
    'users.full_name': 'ФИО',
    'users.email': 'Email',
    'users.role': 'Роль',
    'users.created_date': 'Дата создания',
    'users.actions': 'Действия',
    'users.edit': 'Редактировать',
    'users.delete': 'Удалить',
    'users.password': 'Пароль',
    'users.save': 'Сохранить',
    'users.create': 'Создать',
    'users.cancel': 'Отмена',
    'users.delete_confirm': 'Вы уверены, что хотите удалить этого пользователя?',
    'users.loading': 'Загрузка...',
    
    // Страница "Мои ученики"
    'students.title': 'Мои ученики',
    'students.back': 'Назад',
    'students.loading': 'Загрузка...',
    'students.list_title': 'Список учеников с особыми образовательными потребностями',
    'students.total_count': 'Всего учеников:',
    'students.table.name': 'Имя',
    'students.table.surname': 'Фамилия',
    'students.table.grade': 'Класс',
    'students.table.special_needs': 'Особые потребности',
    'students.table.actions': 'Действия',
    'students.actions.details': 'Подробнее',
    'students.actions.iop': 'ИОП',
    
    // Особые потребности
    'special_needs.adhd': 'ADHD',
    'special_needs.dyslexia': 'Дислексия',
    'special_needs.autism': 'Аутизм',
    'special_needs.zpr': 'ЗПР',
    'special_needs.dysgraphia': 'Дисграфия',
    
    // Страница "Задания"
    'assignments.title': 'Задания',
    'assignments.back': 'Назад',
    'assignments.loading': 'Загрузка...',
    'assignments.list_title': 'Список заданий',
    'assignments.total_count': 'Всего заданий:',
    'assignments.create_button': 'Создать задание',
    'assignments.create_modal_title': 'Создать задание',
    'assignments.table.name': 'Название',
    'assignments.table.subject': 'Предмет',
    'assignments.table.due_date': 'Срок сдачи',
    'assignments.table.status': 'Статус',
    'assignments.table.adaptations': 'Адаптации',
    'assignments.table.actions': 'Действия',
    'assignments.actions.edit': 'Редактировать',
    'assignments.actions.check': 'Проверить',
    
    // Форма создания задания
    'assignments.form.title_label': 'Название задания',
    'assignments.form.title_placeholder': 'Введите название задания',
    'assignments.form.subject_label': 'Предмет',
    'assignments.form.subject_placeholder': 'Выберите предмет',
    'assignments.form.due_date_label': 'Срок сдачи',
    'assignments.form.status_label': 'Статус',
    'assignments.form.adaptations_label': 'Адаптации',
    'assignments.form.add_adaptation': '+ Добавить адаптацию',
    'assignments.form.adaptation_placeholder': 'Введите адаптацию',
    'assignments.form.cancel': 'Отмена',
    'assignments.form.create': 'Создать',
    
    // Предметы
    'subjects.mathematics': 'Математика',
    'subjects.russian': 'Русский язык',
    'subjects.literature': 'Литература',
    'subjects.world_around': 'Окружающий мир',
    'subjects.history': 'История',
    'subjects.geography': 'География',
    'subjects.biology': 'Биология',
    'subjects.physics': 'Физика',
    'subjects.chemistry': 'Химия',
    'subjects.informatics': 'Информатика',
    'subjects.foreign_language': 'Иностранный язык',
    
    // Статусы заданий
    'assignment_status.active': 'Активно',
    'assignment_status.pending': 'Ожидает',
    'assignment_status.completed': 'Завершено',
    
    // Адаптации
    'adaptations.large_font': 'Увеличенный шрифт',
    'adaptations.extra_time': 'Дополнительное время',
    'adaptations.visual_hints': 'Визуальные подсказки',
    'adaptations.step_instructions': 'Пошаговые инструкции',
    'adaptations.pair_work': 'Работа в паре',
    'adaptations.audio_instructions': 'Аудио инструкции',
    'adaptations.separate_room': 'Отдельное помещение',
    
    // Сообщения
    'assignments.messages.title_required': 'Пожалуйста, введите название задания',
    'assignments.messages.subject_required': 'Пожалуйста, выберите предмет',
    'assignments.messages.due_date_required': 'Пожалуйста, укажите срок сдачи',
    'assignments.messages.created_success': 'Задание успешно создано!',
    
    // Страница "Посещаемость"
    'attendance.title': 'Посещаемость',
    'attendance.back': 'Назад',
    'attendance.loading': 'Загрузка...',
    'attendance.journal_title': 'Журнал посещаемости',
    'attendance.instruction': 'Отметьте присутствующих учеников',
    'attendance.date_label': 'Дата:',
    'attendance.table.name': 'Имя',
    'attendance.table.surname': 'Фамилия',
    'attendance.table.grade': 'Класс',
    'attendance.table.presence': 'Присутствие',
    'attendance.table.absence_reason': 'Причина отсутствия',
    'attendance.present': 'Присутствует',
    'attendance.absent': 'Отсутствует',
    'attendance.reason_placeholder': 'Укажите причину',
    'attendance.save_button': 'Сохранить',
    'attendance.saved_success': 'Данные о посещаемости сохранены!',
    
    // Причины отсутствия
    'absence_reasons.illness': 'Болезнь',
    'absence_reasons.family_circumstances': 'Семейные обстоятельства',
    'absence_reasons.medical_appointment': 'Медицинский прием',
    'absence_reasons.transport_issues': 'Проблемы с транспортом',
    'absence_reasons.weather': 'Погодные условия',
    'absence_reasons.other': 'Другое',
    
    // Страница чат-бота
    'chatbot.title': 'AI Чат-бот по инклюзии',
    'chatbot.assistant_title': 'AI Ассистент по инклюзивному образованию',
    'chatbot.assistant_subtitle': 'Задавайте вопросы о работе с детьми с особыми потребностями',
    'chatbot.welcome_message': 'Привет! Я AI-ассистент по инклюзивному образованию. Я могу помочь вам с вопросами о работе с детьми с особыми образовательными потребностями, адаптации учебных материалов и создании инклюзивной среды в классе. Чем могу помочь?',
    'chatbot.input_placeholder': 'Задайте вопрос о инклюзивном образовании...',
    'chatbot.send_button': 'Отправить',
    'chatbot.popular_questions': 'Популярные вопросы:',
    
    // AI ответы - адаптация
    'chatbot.responses.adaptation': 'Для адаптации учебных материалов рекомендую:\n\n• Использовать визуальные подсказки и схемы\n• Разбивать сложные задания на простые шаги\n• Применять мультисенсорные подходы (зрение, слух, осязание)\n• Предоставлять альтернативные форматы (аудио, видео, тактильные материалы)\n• Учитывать индивидуальные особенности каждого ребенка',
    
    // AI ответы - дислексия
    'chatbot.responses.dyslexia': 'При работе с детьми с дислексией важно:\n\n• Использовать шрифт без засечек (Arial, Verdana)\n• Увеличить межстрочный интервал\n• Применять цветовое кодирование\n• Давать больше времени на выполнение заданий\n• Использовать аудио-материалы\n• Разбивать текст на короткие абзацы',
    
    // AI ответы - аутизм
    'chatbot.responses.autism': 'Для детей с РАС рекомендую:\n\n• Создать предсказуемую структуру урока\n• Использовать визуальное расписание\n• Минимизировать сенсорные раздражители\n• Применять социальные истории\n• Давать четкие и конкретные инструкции\n• Использовать специальные интересы ребенка в обучении',
    
    // AI ответы - СДВГ
    'chatbot.responses.adhd': 'При работе с детьми с СДВГ:\n\n• Обеспечьте частые перерывы\n• Используйте активные методы обучения\n• Создайте четкие правила и границы\n• Применяйте позитивное подкрепление\n• Разместите ребенка ближе к учителю\n• Используйте таймеры и визуальные напоминания',
    
    // AI ответы - инклюзия
    'chatbot.responses.inclusion': 'Инклюзивное образование основывается на принципах:\n\n• Принятие и уважение различий\n• Равные возможности для всех\n• Гибкость в методах обучения\n• Сотрудничество между всеми участниками\n• Адаптация образовательной среды\n• Поддержка каждого ребенка в соответствии с его потребностями',
    
    // AI ответы - помощь
    'chatbot.responses.help': 'Вот несколько общих советов для инклюзивного образования:\n\n• Создайте поддерживающую атмосферу в классе\n• Используйте разнообразные методы обучения\n• Поощряйте сотрудничество между детьми\n• Регулярно оценивайте прогресс каждого ребенка\n• Поддерживайте связь с родителями\n• Не бойтесь обращаться за помощью к специалистам',
    
    // AI общие ответы
    'chatbot.responses.general_1': 'Это отличный вопрос! В инклюзивном образовании важно учитывать индивидуальные потребности каждого ребенка. Можете рассказать больше о конкретной ситуации?',
    'chatbot.responses.general_2': 'Понимаю вашу озабоченность. Инклюзивное образование требует терпения и творческого подхода. Какие методы вы уже пробовали?',
    'chatbot.responses.general_3': 'Каждый ребенок уникален, и подходы должны быть индивидуальными. Что именно вас больше всего беспокоит в этой ситуации?',
    'chatbot.responses.general_4': 'Инклюзивное образование - это процесс, который требует времени и поддержки. Какую помощь вы хотели бы получить?',
    'chatbot.responses.general_5': 'Отличный вопрос! В инклюзивном классе важно создать среду, где каждый ребенок чувствует себя принятым и поддерживаемым.',
    
    // Популярные вопросы
    'chatbot.questions.adaptation_dyslexia': 'Как адаптировать материалы для детей с дислексией?',
    'chatbot.questions.autism_tips': 'Советы по работе с детьми с аутизмом',
    'chatbot.questions.inclusive_environment': 'Как создать инклюзивную среду в классе?',
    'chatbot.questions.hyperactive_children': 'Методы работы с гиперактивными детьми',
    'chatbot.questions.inclusion_principles': 'Принципы инклюзивного образования',
    
    // Роли пользователей
    'roles.admin': 'Администратор',
    'roles.teacher': 'Учитель',
    'roles.psychologist': 'Психолог',
    'roles.defectologist': 'Дефектолог',
    'roles.speech_therapist': 'Логопед',
    'roles.tutor': 'Тьютор',
    'roles.user': 'Пользователь',
    
    // Отчеты и статистика
    'reports.title': 'Статистика и отчеты',
    'reports.back_to_dashboard': 'Назад к панели управления',
    'reports.general_statistics': 'Общая статистика',
    'reports.available_reports': 'Доступные отчеты',
    'reports.total_students_sen': 'Всего учеников с ООП',
    'reports.total_teachers': 'Всего учителей',
    'reports.attendance': 'Посещаемость',
    'reports.iop_completion': 'Выполнение ИОП',
    'reports.psychologists': 'Психологи',
    'reports.defectologists': 'Дефектологи',
    'reports.speech_therapists': 'Логопеды',
    'reports.tutors': 'Тьюторы',
    'reports.report_name': 'Название',
    'reports.report_description': 'Описание',
    'reports.report_date': 'Дата',
    'reports.actions': 'Действия',
    'reports.view': 'Просмотреть',
    'reports.close': 'Закрыть',
    'reports.download_pdf': 'Скачать PDF',
    'reports.report_content': 'Содержание отчета:',
    'reports.demo_content': 'Здесь будет отображаться содержание отчета. В настоящее время это демонстрационная версия.',
    'reports.loading': 'Загрузка...',
    
    // Управление ресурсами
    'resources.title': 'Распределение ресурсов',
    'resources.back_to_dashboard': 'Назад к панели управления',
    'resources.filter': 'Фильтр:',
    'resources.all_resources': 'Все ресурсы',
    'resources.rooms': 'Помещения',
    'resources.equipment': 'Оборудование',
    'resources.devices': 'Устройства',
    'resources.add_resource': 'Добавить ресурс',
    'resources.edit_resource': 'Редактировать ресурс',
    'resources.create_resource': 'Добавить ресурс',
    'resources.resource_name': 'Название',
    'resources.resource_type': 'Тип',
    'resources.resource_status': 'Статус',
    'resources.assigned_to': 'Назначен',
    'resources.description': 'Описание',
    'resources.actions': 'Действия',
    'resources.edit': 'Редактировать',
    'resources.delete': 'Удалить',
    'resources.save': 'Сохранить',
    'resources.create': 'Создать',
    'resources.cancel': 'Отмена',
    'resources.delete_confirm': 'Вы уверены, что хотите удалить этот ресурс?',
    'resources.loading': 'Загрузка...',
    'resources.assigned_to_placeholder': 'Назначен (оставьте пустым, если не назначен)',
    
    // Типы ресурсов
    'resource_types.room': 'Помещение',
    'resource_types.equipment': 'Оборудование',
    'resource_types.device': 'Устройство',
    'resource_types.other': 'Другое',
    
    // Статусы ресурсов
    'resource_status.available': 'Доступен',
    'resource_status.occupied': 'Занят',
    'resource_status.maintenance': 'На обслуживании',
    'resource_status.unknown': 'Неизвестно',
    
    // Обучение и консультации
    'training.title': 'Обучение и консультации',
    'training.back': 'Назад',
    'training.online_courses': 'Онлайн курсы',
    'training.specialist_consultations': 'Консультации специалистов',
    'training.available_courses': 'Доступные курсы',
    'training.courses_description': 'Повышайте свою квалификацию с помощью специализированных курсов по инклюзивному образованию',
    'training.consultations_title': 'Консультации специалистов',
    'training.consultations_description': 'Запишитесь на индивидуальную консультацию с экспертами в области инклюзивного образования',
    'training.course_info': 'Информация о курсе',
    'training.book_consultation': 'Запись на консультацию',
    'training.author': 'Автор',
    'training.duration': 'Длительность',
    'training.level': 'Уровень',
    'training.progress': 'Прогресс',
    'training.course_modules': 'Модули курса',
    'training.start_course': 'Начать курс',
    'training.course_completed': 'Курс завершен',
    'training.continue_learning': 'Продолжить обучение',
    'training.specialization': 'Специализация',
    'training.available_dates': 'Доступные даты',
    'training.book': 'Записаться',
    'training.cancel': 'Отмена',
    'training.loading': 'Загрузка...',
    'training.nearest_date': 'Ближайшая доступная дата:',
    
    // Уровни курсов
    'course_levels.beginner': 'Начальный',
    'course_levels.intermediate': 'Средний',
    'course_levels.advanced': 'Продвинутый',
    
    // Языки
    'language.russian': 'Русский',
    'language.kazakh': 'Қазақша',
    'language.switch': 'Переключить язык',
    
    // Страницы психолога - ученики
    'specialist.students.search_by_name': 'Поиск по имени',
    'specialist.students.search_placeholder': 'Введите ФИО ученика',
    'specialist.students.filter_by_grade': 'Фильтр по классу',
    'specialist.students.all_grades': 'Все классы',
    'specialist.students.full_name': 'ФИО',
    'specialist.students.birth_date': 'Дата рождения',
    'specialist.students.grade': 'Класс',
    'specialist.students.special_needs': 'Особенности',
    'specialist.students.observations': 'Наблюдения',
    'specialist.students.profile': 'Профиль',
    'specialist.students.observation': 'Наблюдение',
    'common.actions': 'Действия',
    
    // Страницы психолога - ИОП
    'specialist.iop.search_by_name': 'Поиск по имени ученика',
    'specialist.iop.search_placeholder': 'Введите ФИО ученика',
    'specialist.iop.filter_by_status': 'Фильтр по статусу',
    'specialist.iop.all_statuses': 'Все статусы',
    'specialist.iop.student': 'Ученик',
    'specialist.iop.period': 'Период',
    'specialist.iop.status': 'Статус',
    'specialist.iop.goals': 'Цели',
    'specialist.iop.view': 'Просмотр',
    'specialist.iop.edit': 'Редактировать',
    'specialist.iop.create_new': 'Создать новый ИОП',
    'specialist.iop.active': 'Активен',
    'specialist.iop.draft': 'Черновик',
    'specialist.iop.review': 'На рассмотрении',
    'specialist.iop.completed': 'Завершен',
    'specialist.iop.unknown': 'Неизвестно',
    'specialist.iop.individual_plan': 'Индивидуальный образовательный план',
    'specialist.iop.student_info': 'Информация об ученике',
    'specialist.iop.period_of_action': 'Период действия',
    'specialist.iop.adaptations': 'Адаптации',
    'specialist.iop.methods': 'Методы',
    'specialist.iop.close': 'Закрыть',
    
    // Страницы психолога - консультации
    'specialist.consultations.filter_by_status': 'Фильтр по статусу',
    'specialist.consultations.filter_by_type': 'Фильтр по типу',
    'specialist.consultations.add_consultation': 'Добавить консультацию',
    'specialist.consultations.upcoming': 'Предстоящие консультации',
    'specialist.consultations.past': 'Прошедшие консультации',
    'specialist.consultations.date_time': 'Дата и время',
    'specialist.consultations.type': 'Тип',
    'specialist.consultations.scheduled': 'Запланирована',
    'specialist.consultations.completed': 'Завершена',
    'specialist.consultations.cancelled': 'Отменена',
    'specialist.consultations.individual': 'Индивидуальная',
    'specialist.consultations.group': 'Групповая',
    'specialist.consultations.no_upcoming': 'Нет предстоящих консультаций',
    'specialist.consultations.no_past': 'Нет прошедших консультаций',
    'specialist.consultations.consultation_info': 'Информация о консультации',
    'specialist.consultations.consultation_type': 'Тип консультации',
    'specialist.consultations.notes': 'Примечания',
    'specialist.consultations.no_notes': 'Нет примечаний',
    'specialist.consultations.add_consultation_title': 'Добавить консультацию',
    'specialist.consultations.date': 'Дата',
    'specialist.consultations.time': 'Время',
    'specialist.consultations.select_student': 'Выберите ученика',
    'specialist.consultations.consultation_type_label': 'Тип консультации',
    'specialist.consultations.notes_label': 'Примечания',
    'specialist.consultations.add': 'Добавить',
    'specialist.consultations.cancel': 'Отмена',
    
    // Страницы психолога - отчеты
    'specialist.reports.filter_by_status': 'Фильтр по статусу',
    'specialist.reports.create_report': 'Создать отчет',
    'specialist.reports.title': 'Название',
    'specialist.reports.period': 'Период',
    'specialist.reports.created_date': 'Дата создания',
    'specialist.reports.draft': 'Черновик',
    'specialist.reports.submitted': 'Отправлен',
    'specialist.reports.rejected': 'Отклонен',
    'specialist.reports.view': 'Просмотр',
    'specialist.reports.edit': 'Редактировать',
    'specialist.reports.send': 'Отправить',
    'specialist.reports.no_reports': 'Нет отчетов, соответствующих фильтру',
    'specialist.reports.report_title': 'Название отчета',
    'specialist.reports.period_placeholder': 'Например: Октябрь 2025',
    'specialist.reports.content': 'Содержание отчета',
    'specialist.reports.create': 'Создать',
    'specialist.reports.close': 'Закрыть',
    
    // Страницы психолога - тренинги
    'specialist.training.filter_by_type': 'Фильтр по типу',
    'specialist.training.all_types': 'Все типы',
    'specialist.training.webinars': 'Вебинары',
    'specialist.training.workshops': 'Практикумы',
    'specialist.training.courses': 'Курсы',
    'specialist.training.upcoming': 'Предстоящие тренинги',
    'specialist.training.completed': 'Прошедшие тренинги',
    'specialist.training.webinar': 'Вебинар',
    'specialist.training.workshop': 'Практикум',
    'specialist.training.course': 'Курс',
    'specialist.training.date': 'Дата',
    'specialist.training.duration': 'Продолжительность',
    'specialist.training.instructor': 'Ведущий',
    'specialist.training.more_details': 'Подробнее',
    'specialist.training.no_upcoming': 'Нет предстоящих тренингов',
    'specialist.training.no_completed': 'Нет прошедших тренингов',
    'specialist.training.completed_status': 'Пройден',
    'specialist.training.not_completed_status': 'Не пройден',
    'specialist.training.date_time': 'Дата и время',
    'specialist.training.materials': 'Материалы',
    'specialist.training.register': 'Записаться',
    'specialist.training.download_materials': 'Скачать материалы',
    'specialist.training.close': 'Закрыть',
    'specialist.training.psychologist_title': 'Тренинги по психологической поддержке',
    'specialist.training.defectologist_title': 'Тренинги по коррекционной педагогике',
    'specialist.training.speech_title': 'Тренинги по речевому развитию',
    'specialist.training.tutor_title': 'Тренинги по тьюторскому сопровождению',
  },
  kk: {
    // Навигация
    'nav.dashboard': 'Басқару панелі',
    'nav.back_to_dashboard': 'Басқару панеліне оралу',
    'nav.logout': 'Шығу',
    'nav.loading': 'Жүктелуде...',
    
    // Общие
    'common.loading': 'Жүктелуде...',
    'common.save': 'Сақтау',
    'common.cancel': 'Болдырмау',
    'common.edit': 'Өңдеу',
    'common.delete': 'Жою',
    'common.add': 'Қосу',
    'common.search': 'Іздеу',
    'common.filter': 'Сүзгі',
    'common.yes': 'Иә',
    'common.no': 'Жоқ',
    'common.close': 'Жабу',
    'common.back': 'Артқа',
    'common.next': 'Келесі',
    'common.previous': 'Алдыңғы',
    'common.details': 'Толығырақ',
    
    // Роли пользователей
    'role.admin': 'Басқарушы',
    'role.teacher': 'Мұғалім',
    'role.psychologist': 'Психолог',
    'role.defectologist': 'Дефектолог',
    'role.speech_therapist': 'Логопед',
    'role.tutor': 'Тьютор',
    'role.user': 'Пайдаланушы',
    
    // Dashboard - модули для администратора
    'dashboard.admin.user_management': 'Пайдаланушыларды басқару',
    'dashboard.admin.user_management_desc': 'Тіркелгілерді қосу және өңдеу',
    'dashboard.admin.reports': 'Статистика және есептер',
    'dashboard.admin.reports_desc': 'Мектеп бойынша жалпы статистика',
    'dashboard.admin.resources': 'Ресурстарды бөлу',
    'dashboard.admin.resources_desc': 'Мектеп ресурстарын басқару',
    
    // Dashboard - модули для учителя
    'dashboard.teacher.students': 'Менің оқушыларым',
    'dashboard.teacher.students_desc': 'Арнайы қажеттіліктері бар оқушылар тізімі',
    'dashboard.teacher.assignments': 'Тапсырмалар',
    'dashboard.teacher.assignments_desc': 'Тапсырмалар жасау және тексеру',
    'dashboard.teacher.attendance': 'Қатысу',
    'dashboard.teacher.attendance_desc': 'Қатысу белгілеу',
    'dashboard.teacher.training': 'Оқыту',
    'dashboard.teacher.training_desc': 'Мұғалімдерге арналған тренингтер және кеңестер',
    
    // Dashboard - модули для специалистов
    'dashboard.specialist.students': 'Менің оқушыларым',
    'dashboard.specialist.students_desc': 'Арнайы қажеттіліктері бар оқушылар тізімі',
    'dashboard.specialist.iop': 'Жеке жоспарлар',
    'dashboard.specialist.iop_desc': 'Жеке білім беру жоспарлары',
    'dashboard.specialist.consultations': 'Кеңестер',
    'dashboard.specialist.consultations_desc': 'Кеңес кестесі және жазбалары',
    'dashboard.specialist.reports': 'Есептер',
    'dashboard.specialist.reports_desc': 'Орындалған жұмыс туралы есептер',
    'dashboard.specialist.training': 'Тренингтер',
    'dashboard.specialist.training_desc_psychologist': 'Психологиялық қолдау материалдары',
    'dashboard.specialist.training_desc_defectologist': 'Түзету педагогикасы материалдары',
    'dashboard.specialist.training_desc_speech': 'Логопедиялық жұмыс материалдары',
    'dashboard.specialist.training_desc_tutor': 'Тьюторлық қолдау материалдары',
    
    // Заголовки страниц
    'page.dashboard.title': 'Басқару панелі',
    'page.dashboard.welcome': 'Қош келдіңіз',
    'page.dashboard.role': 'Сіздің рөліңіз',
    'page.dashboard.modules': 'Қол жетімді модульдер',
    'page.dashboard.user_info': 'Пайдаланушы туралы ақпарат',
    'page.dashboard.user_name': 'Аты-жөні',
    'page.dashboard.user_email': 'Email',
    'page.dashboard.user_role': 'Рөл',
    'page.dashboard.common_resources': 'Жалпы ресурстар',
    'page.dashboard.role_modules': 'Сіздің рөліңізге арналған модульдер',
    'page.dashboard.ai_chatbot': 'Инклюзия бойынша AI чат-бот',
    'page.dashboard.ai_chatbot_desc': 'Инклюзивті білім беру мәселелері бойынша көмек алыңыз',
    'page.dashboard.open_chat': 'Чат-ботты ашу →',
    'common.open': 'Ашу',
    'page.dashboard.normative_acts.title': 'Нормативтік актілер',
    'page.dashboard.normative_acts.description': 'Инклюзия бойынша заңдар мен құқықтық құжаттар',
    'page.dashboard.normative_acts.open': 'Құжаттарды ашу →',
    
    // Аутентификация
    'auth.login.title': 'Жүйеге кіру',
    'auth.login.email': 'Email',
    'auth.login.password': 'Құпия сөз',
    'auth.login.submit': 'Кіру',
    'auth.login.submitting': 'Кіруде...',
    'auth.login.error': 'Кіру кезінде қате орын алды. Қайталап көріңіз.',
    'auth.login.email_placeholder': 'example@school.ru',
    'auth.platform_description': 'Инклюзивті білім беру платформасы',
    
    // Страница нормативных актов
    'legal.title': 'Нормативтік актілер',
    'legal.main_title': 'Инклюзивті білім беру бойынша нормативтік актілер',
    'legal.description': 'Қазақстан Республикасының инклюзивті білім беру және мүгедектерді әлеуметтік қорғау саласындағы құқықтық базасы мен заңнамалық актілері',
    'legal.info_system.title': 'Ақпараттық-құқықтық жүйе',
    'legal.info_system.description': 'Қазақстан Республикасы Әділет министрлігінің заңнама және құқықтық ақпарат институты',
    'legal.document_content': 'Құжат мазмұны:',
    'legal.additional_resources': 'Қосымша ресурстар',
    'legal.useful_links': 'Пайдалы сілтемелер',
    'legal.contact_info': 'Байланыс ақпараты',
    'legal.phone': 'Телефон:',
    'legal.email': 'Email:',
    'legal.working_hours': 'Жұмыс уақыты:',
    
    // Типы документов
    'legal.document_type.government_decree': 'Үкімет қаулысы',
    'legal.document_type.law_rk': 'ҚР Заңы',
    'legal.document_type.code_rk': 'ҚР Кодексі',
    'legal.document_type.international_treaty': 'Халықаралық шарт',
    
    // Пайдаланушыларды басқару
    'users.title': 'Пайдаланушыларды басқару',
    'users.add_user': 'Пайдаланушы қосу',
    'users.edit_user': 'Пайдаланушыны өңдеу',
    'users.create_user': 'Пайдаланушы қосу',
    'users.full_name': 'Аты-жөні',
    'users.email': 'Email',
    'users.role': 'Рөл',
    'users.created_date': 'Жасалған күні',
    'users.actions': 'Әрекеттер',
    'users.edit': 'Өңдеу',
    'users.delete': 'Жою',
    'users.password': 'Құпия сөз',
    'users.save': 'Сақтау',
    'users.create': 'Жасау',
    'users.cancel': 'Болдырмау',
    'users.delete_confirm': 'Бұл пайдаланушыны жойғыңыз келетініне сенімдісіз бе?',
    'users.loading': 'Жүктелуде...',
    
    // "Менің оқушыларым" беті
    'students.title': 'Менің оқушыларым',
    'students.back': 'Артқа',
    'students.loading': 'Жүктелуде...',
    'students.list_title': 'Арнайы білім беру қажеттіліктері бар оқушылар тізімі',
    'students.total_count': 'Барлық оқушылар:',
    'students.table.name': 'Аты',
    'students.table.surname': 'Тегі',
    'students.table.grade': 'Сынып',
    'students.table.special_needs': 'Арнайы қажеттіліктер',
    'students.table.actions': 'Әрекеттер',
    'students.actions.details': 'Толығырақ',
    'students.actions.iop': 'ЖБЖ',
    
    // Арнайы қажеттіліктер
    'special_needs.adhd': 'ADHD',
    'special_needs.dyslexia': 'Дислексия',
    'special_needs.autism': 'Аутизм',
    'special_needs.zpr': 'ЗПР',
    'special_needs.dysgraphia': 'Дисграфия',
    
    // "Тапсырмалар" беті
    'assignments.title': 'Тапсырмалар',
    'assignments.back': 'Артқа',
    'assignments.loading': 'Жүктелуде...',
    'assignments.list_title': 'Тапсырмалар тізімі',
    'assignments.total_count': 'Барлық тапсырмалар:',
    'assignments.create_button': 'Тапсырма жасау',
    'assignments.create_modal_title': 'Тапсырма жасау',
    'assignments.table.name': 'Атауы',
    'assignments.table.subject': 'Пән',
    'assignments.table.due_date': 'Орындау мерзімі',
    'assignments.table.status': 'Мәртебе',
    'assignments.table.adaptations': 'Бейімдеулер',
    'assignments.table.actions': 'Әрекеттер',
    'assignments.actions.edit': 'Өңдеу',
    'assignments.actions.check': 'Тексеру',
    
    // Тапсырма жасау формасы
    'assignments.form.title_label': 'Тапсырма атауы',
    'assignments.form.title_placeholder': 'Тапсырма атауын енгізіңіз',
    'assignments.form.subject_label': 'Пән',
    'assignments.form.subject_placeholder': 'Пәнді таңдаңыз',
    'assignments.form.due_date_label': 'Орындау мерзімі',
    'assignments.form.status_label': 'Мәртебе',
    'assignments.form.adaptations_label': 'Бейімдеулер',
    'assignments.form.add_adaptation': '+ Бейімдеу қосу',
    'assignments.form.adaptation_placeholder': 'Бейімдеуді енгізіңіз',
    'assignments.form.cancel': 'Болдырмау',
    'assignments.form.create': 'Жасау',
    
    // Пәндер
    'subjects.mathematics': 'Математика',
    'subjects.russian': 'Орыс тілі',
    'subjects.literature': 'Әдебиет',
    'subjects.world_around': 'Жаратылыстану',
    'subjects.history': 'Тарих',
    'subjects.geography': 'География',
    'subjects.biology': 'Биология',
    'subjects.physics': 'Физика',
    'subjects.chemistry': 'Химия',
    'subjects.informatics': 'Информатика',
    'subjects.foreign_language': 'Шет тілі',
    
    // Тапсырма мәртебелері
    'assignment_status.active': 'Белсенді',
    'assignment_status.pending': 'Күтуде',
    'assignment_status.completed': 'Аяқталды',
    
    // Бейімдеулер
    'adaptations.large_font': 'Үлкен қаріп',
    'adaptations.extra_time': 'Қосымша уақыт',
    'adaptations.visual_hints': 'Көрнекі көмек',
    'adaptations.step_instructions': 'Қадамдық нұсқаулар',
    'adaptations.pair_work': 'Жұппен жұмыс',
    'adaptations.audio_instructions': 'Дыбыстық нұсқаулар',
    'adaptations.separate_room': 'Бөлек бөлме',
    
    // Хабарламалар
    'assignments.messages.title_required': 'Тапсырма атауын енгізіңіз',
    'assignments.messages.subject_required': 'Пәнді таңдаңыз',
    'assignments.messages.due_date_required': 'Орындау мерзімін көрсетіңіз',
    'assignments.messages.created_success': 'Тапсырма сәтті жасалды!',
    
    // "Қатысу" беті
    'attendance.title': 'Қатысу',
    'attendance.back': 'Артқа',
    'attendance.loading': 'Жүктелуде...',
    'attendance.journal_title': 'Қатысу журналы',
    'attendance.instruction': 'Қатысқан оқушыларды белгілеңіз',
    'attendance.date_label': 'Күні:',
    'attendance.table.name': 'Аты',
    'attendance.table.surname': 'Тегі',
    'attendance.table.grade': 'Сынып',
    'attendance.table.presence': 'Қатысу',
    'attendance.table.absence_reason': 'Қатыспау себебі',
    'attendance.present': 'Қатысты',
    'attendance.absent': 'Қатыспады',
    'attendance.reason_placeholder': 'Себебін көрсетіңіз',
    'attendance.save_button': 'Сақтау',
    'attendance.saved_success': 'Қатысу туралы деректер сақталды!',
    
    // Қатыспау себептері
    'absence_reasons.illness': 'Ауру',
    'absence_reasons.family_circumstances': 'Отбасылық жағдайлар',
    'absence_reasons.medical_appointment': 'Дәрігерге бару',
    'absence_reasons.transport_issues': 'Көлік мәселелері',
    'absence_reasons.weather': 'Ауа райы жағдайлары',
    'absence_reasons.other': 'Басқа',
    
    // Чат-бот беті
    'chatbot.title': 'Инклюзия бойынша AI чат-бот',
    'chatbot.assistant_title': 'Инклюзивті білім беру бойынша AI көмекшісі',
    'chatbot.assistant_subtitle': 'Арнайы қажеттіліктері бар балалармен жұмыс туралы сұрақтар қойыңыз',
    'chatbot.welcome_message': 'Сәлем! Мен инклюзивті білім беру бойынша AI көмекшісімін. Арнайы білім беру қажеттіліктері бар балалармен жұмыс, оқу материалдарын бейімдеу және сыныпта инклюзивті орта жасау туралы сұрақтарға көмектесе аламын. Қалай көмектесе аламын?',
    'chatbot.input_placeholder': 'Инклюзивті білім беру туралы сұрақ қойыңыз...',
    'chatbot.send_button': 'Жіберу',
    'chatbot.popular_questions': 'Танымал сұрақтар:',
    
    // AI жауаптары - бейімдеу
    'chatbot.responses.adaptation': 'Оқу материалдарын бейімдеу үшін мынаны ұсынамын:\n\n• Көрнекі көмектер мен схемаларды пайдалану\n• Күрделі тапсырмаларды қарапайым қадамдарға бөлу\n• Көпсезімді тәсілдерді қолдану (көру, есту, сезім)\n• Альтернативті форматтарды ұсыну (аудио, видео, тактильді материалдар)\n• Әр баланың жеке ерекшеліктерін ескеру',
    
    // AI жауаптары - дислексия
    'chatbot.responses.dyslexia': 'Дислексиясы бар балалармен жұмыс істегенде маңызды:\n\n• Серіппесіз қаріпті пайдалану (Arial, Verdana)\n• Жоларалық аралықты ұлғайту\n• Түстік кодтауды қолдану\n• Тапсырмаларды орындауға көбірек уақыт беру\n• Аудио материалдарды пайдалану\n• Мәтінді қысқа абзацтарға бөлу',
    
    // AI жауаптары - аутизм
    'chatbot.responses.autism': 'РАС-ы бар балалар үшін мынаны ұсынамын:\n\n• Сабақтың болжамдық құрылымын жасау\n• Көрнекі кестені пайдалану\n• Сезімдік тітіркендіргіштерді азайту\n• Әлеуметтік әңгімелерді қолдану\n• Нақты және түсінікті нұсқаулар беру\n• Баланың арнайы қызығушылықтарын оқытуда пайдалану',
    
    // AI жауаптары - СДВГ
    'chatbot.responses.adhd': 'СДВГ-ы бар балалармен жұмыс істегенде:\n\n• Жиі үзілістерді қамтамасыз ету\n• Белсенді оқыту әдістерін пайдалану\n• Нақты ережелер мен шекаралар жасау\n• Оң күшейтуді қолдану\n• Баланы мұғалімге жақынырақ орналастыру\n• Таймерлер мен көрнекі еске салғыштарды пайдалану',
    
    // AI жауаптары - инклюзия
    'chatbot.responses.inclusion': 'Инклюзивті білім беру мына принциптерге негізделген:\n\n• Айырмашылықтарды қабылдау және құрметтеу\n• Барлығына тең мүмкіндіктер\n• Оқыту әдістерінде икемділік\n• Барлық қатысушылар арасындағы ынтымақтастық\n• Білім беру ортасын бейімдеу\n• Әр баланың қажеттіліктеріне сәйкес қолдау көрсету',
    
    // AI жауаптары - көмек
    'chatbot.responses.help': 'Инклюзивті білім беру үшін бірнеше жалпы кеңестер:\n\n• Сыныпта қолдаушы атмосфера жасау\n• Әртүрлі оқыту әдістерін пайдалану\n• Балалар арасындағы ынтымақтастықты ынталандыру\n• Әр баланың прогрессін дұрыс бағалау\n• Ата-аналармен байланысты сақтау\n• Специалисттерден көмек сұраудан қорықпау',
    
    // AI жалпы жауаптары
    'chatbot.responses.general_1': 'Бұл керемет сұрақ! Инклюзивті білім беруде әр баланың жеке қажеттіліктерін ескеру маңызды. Нақты жағдай туралы көбірек айта аласыз ба?',
    'chatbot.responses.general_2': 'Сіздің алаңдаушылығыңызды түсінемін. Инклюзивті білім беру шыдамдылық пен шығармашылық тәсілді талап етеді. Қандай әдістерді қолданып көрдіңіз?',
    'chatbot.responses.general_3': 'Әр бала бірегей, және тәсілдер де жеке болуы керек. Бұл жағдайда сізді ең көп не алаңдатады?',
    'chatbot.responses.general_4': 'Инклюзивті білім беру - уақыт пен қолдауды талап ететін процесс. Қандай көмекті алғыңыз келеді?',
    'chatbot.responses.general_5': 'Керемет сұрақ! Инклюзивті сыныпта әр баланың қабылданған және қолдау көрсетілген сезінетін орта жасау маңызды.',
    
    // Танымал сұрақтар
    'chatbot.questions.adaptation_dyslexia': 'Дислексиясы бар балаларға материалдарды қалай бейімдеу керек?',
    'chatbot.questions.autism_tips': 'Аутизмі бар балалармен жұмыс туралы кеңестер',
    'chatbot.questions.inclusive_environment': 'Сыныпта инклюзивті ортаны қалай жасау керек?',
    'chatbot.questions.hyperactive_children': 'Гиперактивті балалармен жұмыс әдістері',
    'chatbot.questions.inclusion_principles': 'Инклюзивті білім беру принциптері',
    
    // Пайдаланушы рөлдері
    'roles.admin': 'Әкімші',
    'roles.teacher': 'Мұғалім',
    'roles.psychologist': 'Психолог',
    'roles.defectologist': 'Дефектолог',
    'roles.speech_therapist': 'Логопед',
    'roles.tutor': 'Тьютор',
    'roles.user': 'Пайдаланушы',
    
    // Есептер және статистика
    'reports.title': 'Статистика және есептер',
    'reports.back_to_dashboard': 'Басқару панеліне оралу',
    'reports.general_statistics': 'Жалпы статистика',
    'reports.available_reports': 'Қолжетімді есептер',
    'reports.total_students_sen': 'Барлық ОҚҚ бар оқушылар',
    'reports.total_teachers': 'Барлық мұғалімдер',
    'reports.attendance': 'Қатысу',
    'reports.iop_completion': 'ЖЖБ орындау',
    'reports.psychologists': 'Психологтар',
    'reports.defectologists': 'Дефектологтар',
    'reports.speech_therapists': 'Логопедтер',
    'reports.tutors': 'Тьюторлар',
    'reports.report_name': 'Атауы',
    'reports.report_description': 'Сипаттамасы',
    'reports.report_date': 'Күні',
    'reports.actions': 'Әрекеттер',
    'reports.view': 'Көру',
    'reports.close': 'Жабу',
    'reports.download_pdf': 'PDF жүктеу',
    'reports.report_content': 'Есеп мазмұны:',
    'reports.demo_content': 'Мұнда есеп мазмұны көрсетіледі. Қазіргі уақытта бұл демонстрациялық нұсқа.',
    'reports.loading': 'Жүктелуде...',
    
    // Ресурстарды басқару
    'resources.title': 'Ресурстарды бөлу',
    'resources.back_to_dashboard': 'Басқару панеліне оралу',
    'resources.filter': 'Сүзгі:',
    'resources.all_resources': 'Барлық ресурстар',
    'resources.rooms': 'Бөлмелер',
    'resources.equipment': 'Жабдықтар',
    'resources.devices': 'Құрылғылар',
    'resources.add_resource': 'Ресурс қосу',
    'resources.edit_resource': 'Ресурсты өңдеу',
    'resources.create_resource': 'Ресурс қосу',
    'resources.resource_name': 'Атауы',
    'resources.resource_type': 'Түрі',
    'resources.resource_status': 'Статусы',
    'resources.assigned_to': 'Тағайындалған',
    'resources.description': 'Сипаттамасы',
    'resources.actions': 'Әрекеттер',
    'resources.edit': 'Өңдеу',
    'resources.delete': 'Жою',
    'resources.save': 'Сақтау',
    'resources.create': 'Жасау',
    'resources.cancel': 'Болдырмау',
    'resources.delete_confirm': 'Бұл ресурсты жойғыңыз келетініне сенімдісіз бе?',
    'resources.loading': 'Жүктелуде...',
    'resources.assigned_to_placeholder': 'Тағайындалмаған болса, бос қалдырыңыз',
    
    // Ресурс түрлері
    'resource_types.room': 'Бөлме',
    'resource_types.equipment': 'Жабдық',
    'resource_types.device': 'Құрылғы',
    'resource_types.other': 'Басқа',
    
    // Ресурс статустары
    'resource_status.available': 'Қолжетімді',
    'resource_status.occupied': 'Алынған',
    'resource_status.maintenance': 'Техникалық қызметте',
    'resource_status.unknown': 'Белгісіз',
    
    // Оқыту және консультациялар
    'training.title': 'Оқыту және консультациялар',
    'training.back': 'Артқа',
    'training.online_courses': 'Онлайн курсар',
    'training.specialist_consultations': 'Специалист консультациялары',
    'training.available_courses': 'Қолжетімді курсар',
    'training.courses_description': 'Инклюзивті білім беру бойынша мамандандырылған курсар арқылы біліктілігіңізді арттырыңыз',
    'training.consultations_title': 'Специалист консультациялары',
    'training.consultations_description': 'Инклюзивті білім беру саласындағы сарапшылармен жеке консультацияға жазылыңыз',
    'training.course_info': 'Курс туралы ақпарат',
    'training.book_consultation': 'Консультацияға жазу',
    'training.author': 'Автор',
    'training.duration': 'Ұзақтығы',
    'training.level': 'Деңгей',
    'training.progress': 'Прогресс',
    'training.course_modules': 'Курс модульдері',
    'training.start_course': 'Курсты бастау',
    'training.course_completed': 'Курс аяқталды',
    'training.continue_learning': 'Оқуды жалғастыру',
    'training.specialization': 'Специализация',
    'training.available_dates': 'Қолжетімді күндер',
    'training.book': 'Жазу',
    'training.cancel': 'Болдырмау',
    'training.loading': 'Жүктелуде...',
    'training.nearest_date': 'Ең жақын қолжетімді күн:',
    
    // Курс деңгейлері
    'course_levels.beginner': 'Бастапқы',
    'course_levels.intermediate': 'Орташа',
    'course_levels.advanced': 'Жоғары',
    
    // Языки
    'language.russian': 'Русский',
    'language.kazakh': 'Қазақша',
    'language.switch': 'Тілді ауыстыру',
    
    // Страницы психолога - ученики
    'specialist.students.search_by_name': 'Аты бойынша іздеу',
    'specialist.students.search_placeholder': 'Оқушының аты-жөнін енгізіңіз',
    'specialist.students.filter_by_grade': 'Сынып бойынша сүзгі',
    'specialist.students.all_grades': 'Барлық сыныптар',
    'specialist.students.full_name': 'Аты-жөні',
    'specialist.students.birth_date': 'Туған күні',
    'specialist.students.grade': 'Сынып',
    'specialist.students.special_needs': 'Ерекше қажеттіліктер',
    'specialist.students.observations': 'Бақылаулар',
    'specialist.students.profile': 'Профиль',
    'specialist.students.observation': 'Бақылау',
    'common.actions': 'Әрекеттер',
    
    // Страницы психолога - ИОП
    'specialist.iop.search_by_name': 'Оқушы аты бойынша іздеу',
    'specialist.iop.search_placeholder': 'Оқушының аты-жөнін енгізіңіз',
    'specialist.iop.filter_by_status': 'Мәртебе бойынша сүзгі',
    'specialist.iop.all_statuses': 'Барлық мәртебелер',
    'specialist.iop.student': 'Оқушы',
    'specialist.iop.period': 'Кезең',
    'specialist.iop.status': 'Мәртебе',
    'specialist.iop.goals': 'Мақсаттар',
    'specialist.iop.view': 'Көру',
    'specialist.iop.edit': 'Өңдеу',
    'specialist.iop.create_new': 'Жаңа ЖБЖ жасау',
    'specialist.iop.active': 'Белсенді',
    'specialist.iop.draft': 'Жоба',
    'specialist.iop.review': 'Қарауда',
    'specialist.iop.completed': 'Аяқталған',
    'specialist.iop.unknown': 'Белгісіз',
    'specialist.iop.individual_plan': 'Жеке білім беру жоспары',
    'specialist.iop.student_info': 'Оқушы туралы ақпарат',
    'specialist.iop.period_of_action': 'Әрекет кезеңі',
    'specialist.iop.adaptations': 'Бейімдеулер',
    'specialist.iop.methods': 'Әдістер',
    'specialist.iop.close': 'Жабу',
    
    // Страницы психолога - консультации
    'specialist.consultations.filter_by_status': 'Мәртебе бойынша сүзгі',
    'specialist.consultations.filter_by_type': 'Түр бойынша сүзгі',
    'specialist.consultations.add_consultation': 'Кеңес қосу',
    'specialist.consultations.upcoming': 'Алдағы кеңестер',
    'specialist.consultations.past': 'Өткен кеңестер',
    'specialist.consultations.date_time': 'Күні мен уақыты',
    'specialist.consultations.type': 'Түрі',
    'specialist.consultations.scheduled': 'Жоспарланған',
    'specialist.consultations.completed': 'Аяқталған',
    'specialist.consultations.cancelled': 'Болдырмаған',
    'specialist.consultations.individual': 'Жеке',
    'specialist.consultations.group': 'Топтық',
    'specialist.consultations.no_upcoming': 'Алдағы кеңестер жоқ',
    'specialist.consultations.no_past': 'Өткен кеңестер жоқ',
    'specialist.consultations.consultation_info': 'Кеңес туралы ақпарат',
    'specialist.consultations.consultation_type': 'Кеңес түрі',
    'specialist.consultations.notes': 'Ескертулер',
    'specialist.consultations.no_notes': 'Ескертулер жоқ',
    'specialist.consultations.add_consultation_title': 'Кеңес қосу',
    'specialist.consultations.date': 'Күні',
    'specialist.consultations.time': 'Уақыты',
    'specialist.consultations.select_student': 'Оқушыны таңдаңыз',
    'specialist.consultations.consultation_type_label': 'Кеңес түрі',
    'specialist.consultations.notes_label': 'Ескертулер',
    'specialist.consultations.add': 'Қосу',
    'specialist.consultations.cancel': 'Болдырмау',
    
    // Страницы психолога - отчеты
    'specialist.reports.filter_by_status': 'Мәртебе бойынша сүзгі',
    'specialist.reports.create_report': 'Есеп жасау',
    'specialist.reports.title': 'Атауы',
    'specialist.reports.period': 'Кезең',
    'specialist.reports.created_date': 'Жасалған күні',
    'specialist.reports.draft': 'Жоба',
    'specialist.reports.submitted': 'Жіберілген',
    'specialist.reports.rejected': 'Қабылданбаған',
    'specialist.reports.view': 'Көру',
    'specialist.reports.edit': 'Өңдеу',
    'specialist.reports.send': 'Жіберу',
    'specialist.reports.no_reports': 'Сүзгіге сәйкес есептер жоқ',
    'specialist.reports.report_title': 'Есеп атауы',
    'specialist.reports.period_placeholder': 'Мысалы: Қазан 2025',
    'specialist.reports.content': 'Есеп мазмұны',
    'specialist.reports.create': 'Жасау',
    'specialist.reports.close': 'Жабу',
    
    // Страницы психолога - тренинги
    'specialist.training.filter_by_type': 'Түр бойынша сүзгі',
    'specialist.training.all_types': 'Барлық түрлер',
    'specialist.training.webinars': 'Веб-семинарлар',
    'specialist.training.workshops': 'Практикумдар',
    'specialist.training.courses': 'Курстар',
    'specialist.training.upcoming': 'Алдағы тренингтер',
    'specialist.training.completed': 'Өткен тренингтер',
    'specialist.training.webinar': 'Веб-семинар',
    'specialist.training.workshop': 'Практикум',
    'specialist.training.course': 'Курс',
    'specialist.training.date': 'Күні',
    'specialist.training.duration': 'Ұзақтығы',
    'specialist.training.instructor': 'Жетекші',
    'specialist.training.more_details': 'Толығырақ',
    'specialist.training.no_upcoming': 'Алдағы тренингтер жоқ',
    'specialist.training.no_completed': 'Өткен тренингтер жоқ',
    'specialist.training.completed_status': 'Өткізілген',
    'specialist.training.not_completed_status': 'Өткізілмеген',
    'specialist.training.date_time': 'Күні мен уақыты',
    'specialist.training.materials': 'Материалдар',
    'specialist.training.register': 'Тіркелу',
    'specialist.training.download_materials': 'Материалдарды жүктеу',
    'specialist.training.close': 'Жабу',
    'specialist.training.psychologist_title': 'Психологиялық қолдау материалдары',
    'specialist.training.defectologist_title': 'Түзету педагогикасы материалдары',
    'specialist.training.speech_title': 'Сөйлеу дамыту материалдары',
    'specialist.training.tutor_title': 'Тьюторлық қолдау материалдары',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('ru');

  // Загружаем сохраненный язык из localStorage при инициализации
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'ru' || savedLanguage === 'kk')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Сохраняем язык в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
